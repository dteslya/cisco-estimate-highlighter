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

    # Find header row and part number column
    for row in ws.iter_rows():
        for cell in row:
            if re.match(
                r"(^.*part number.*$)|(^.*item name.*$)", str(cell.value), re.IGNORECASE
            ):
                header_row = cell.row  # save header row
                partnumber_col = cell.column  # save partnumber column
                break
    # Find description column
    for row in ws.iter_rows(min_row=header_row, max_row=header_row):
        for cell in row:
            if re.match(r"^.*Description.*$", str(cell.value), re.IGNORECASE):
                description_col = cell.column
                break
    # Find list price column
    for row in ws.iter_rows(min_row=header_row, max_row=header_row):
        for cell in row:
            if re.match(r"^.*list\s?price.*$", str(cell.value), re.IGNORECASE):
                price_col = cell.column
                break
    # print(f"Header row: {header_row}")
    # print(f"PN Column: {partnumber_col}")
    # print(f"List Price Column: {price_col}")

    # Mark zero VAT items
    for row_number in range(header_row + 1, ws.max_row + 1):
        partnumber = ws.cell(row=row_number, column=partnumber_col).value
        description = ws.cell(row=row_number, column=description_col).value
        price = ws.cell(row=row_number, column=price_col).value
        # Check partnumber and price
        if (
            re.match(r"(^[LRS]-)|(^LIC-)|(.*[1-9]Y$)", str(partnumber))
            and int(price) > 0
        ):
            for cell in ws[row_number]:
                cell.fill = yellow_fill
        # Check description and price
        elif (
            re.match(r".*e-?[\s-]?delivery.*", str(description), re.IGNORECASE)
            and int(price) > 0
        ):
            for cell in ws[row_number]:
                cell.fill = yellow_fill
    # Save resulting sheet in temp file
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
