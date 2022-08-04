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
            setExcelFile([])
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
      <input type="file" onChange={(e)=>setExcelFile(e.target.files)} files={excelFile} />
      <ReactToPrint
        content={() =>inputRef}
        trigger={() => <button className="btn btn-dark btn-sm mt-1">Print to PDF!</button>}
        />
      <div className='my-5' ref={(response) => (inputRef = response)}>
        <div style={{textAlign:'center'}}>
            {
                fileData.map((x,i)=>{
                    return(
                        <div className='mx-3 my-2' key={i} style={{display:'inline-block', width:230}}>
                            <h5>{x.Client}</h5>
                            <div style={{fontSize:13}}>
                                <span>{"("}{x.Invoice}{")"} </span>
                                <span>{"("}{x.Job}{")"} </span>
                                <span>{"("}{x.GD}{")"} </span>
                            </div>
                            <div>Rs. {x.Amount}</div>
                            <Barcode value={`${x.Job}`} />
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