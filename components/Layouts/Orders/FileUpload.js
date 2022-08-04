import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import * as XLSX from "xlsx";
import { Container, Row, Col } from 'react-bootstrap';
import Barcode from 'react-barcode';

const FileUpload = () => {

    const inputRef = useRef(null);
    const [fileData, setFileData] = useState([]);

    const [excelFile, setExcelFile] = useState([])

    useEffect(() => {
        if(excelFile.length!=0){
            reader();
        }else{
            setExcelFile([]);
        }
    }, [excelFile])

    const reader = async() => {
        const [file] = excelFile;
        const reader = new FileReader();
    
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          console.log(data);
          setFileData(data);
        };
        reader.readAsBinaryString(file);
      };
    
  return (
    <div>
      <div className='mt-5'>
        <div style={{textAlign:'center'}}>
        <input type="file" style={{border:'1px solid silver', padding:100}} onChange={(e)=>setExcelFile(e.target.files)} files={excelFile} /><br/>
      <ReactToPrint
        content={() =>inputRef}
        trigger={() => <button className="purple-btn mt-3">Print to PDF!</button>}
        />
        </div>
      </div>
      <div className='my-5' ref={(response) => (inputRef = response)}>
        <div style={{textAlign:'center'}}>
            {
            fileData.map((x,i)=>{
                return(
                    <div className='mx-3' key={i} style={{display:'inline-block', width:230}}>
                        <h5 style={{maxWidth:250}}>{x.Client}</h5>
                        <div style={{fontSize:13}}>
                            <span>{"("}{x.Invoice}{")"} </span>
                            <span>{"("}{x.Job}{")"} </span>
                            <span>{"("}{x.GD}{")"} </span>
                        </div>
                        <div>{x.Amount}</div>
                        <Barcode value={`${x.Invoice}`} />
                        <hr/>
                    </div>
                )
            })
            }
          </div>
        </div>
      </div>
  )
}

export default FileUpload;