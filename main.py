from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import re
from tempfile import NamedTemporaryFile
from openpyxl import load_workbook
from openpyxl.styles import PatternFill
from io import BytesIO

stream = None

app = FastAPI()


app.mount("/static", StaticFiles(directory="client/build/static"), name="static")


@app.get("/")
async def read_index():
    return FileResponse("client/build/index.html")


@app.get("/favicon.ico")
async def favicon():
    return FileResponse("client/build/favicon.ico")


@app.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):
    global stream
    contents = await file.read()
    wb = load_workbook(filename=BytesIO(contents))
    ws = wb.active
    yellow_fill = PatternFill(
        fill_type="solid", start_color="FFFF00", end_color="FFFF00"
    )
    for row in ws.iter_rows():
        for cell in row:
            if re.match(r"^.*license.*$", str(cell.value), re.IGNORECASE):
                for cell in ws[cell.row]:
                    cell.fill = yellow_fill

    with NamedTemporaryFile() as tmp:
        wb.save(tmp.name)
        tmp.seek(0)
        stream = tmp.read()

    return {"status": "ok"}


@app.get("/download/")
async def download_file():
    global stream
    if stream:
        response = StreamingResponse(
            BytesIO(stream),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        )
        response.headers["Content-Disposition"] = "attachment; filename=estimate.xlsx"
    else:
        response = {"message": "nothing to download"}
    return response
