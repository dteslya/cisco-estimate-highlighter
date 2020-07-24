import React from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'

export const MyUploader = () => {

    const getUploadParams = () => {
        return { url: '/upload' }
      }
  
    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
        if (status == 'done') {
          console.log("yeah")
          fetch('/download')
          // https://stackoverflow.com/a/9834261
          .then(resp => resp.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            //a.download = 'estimate.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            //alert('your file has downloaded!'); // or you know, something with better UX...
          })
          .catch(() => console.log('oh no!'));
        }
    }
  
     
    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            maxFiles={1}
            multiple={false}
            canCancel={false}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            inputContent={(files, extra) => (extra.reject ? 'XLSX files only' : 'Drop XLSX File')}
            styles={{
              dropzone: { border: '4px dashed #f2f2f2',
                          width: 400,
                          height: 200,
                          overflow: 'auto',
                        },
              dropzoneActive: { borderColor: '#01A460' },
              inputLabel: (files, extra) => 
                (extra.reject ? { fontFamily: 'Roboto', color: 'red' } : { fontFamily: 'Roboto', color: '#01A460'}),
            }}
        />
    )
  }
