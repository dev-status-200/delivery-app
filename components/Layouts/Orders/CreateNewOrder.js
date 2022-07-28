import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form  } from 'react-bootstrap'
import ReactToPrint from 'react-to-print';
import Barcode from "react-barcode";
import axios from 'axios'

const CreateNewOrder = (props) => {

    const inputRef = useRef(null);

    const [show, setShow] = useState(false);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [invoice, setInvoice] = useState('');
    const [job, setJob] = useState('');
    const [machineNo, setMachineNo] = useState('');
    const [balance, setBalance] = useState('');
    
    const generateBarcode = () => {
        let value = '';
        if(job!='' & invoice!=''){
          value=job+'|'+invoice;
          setCode(job+'|'+invoice);
          setShow(true);
        }
        return value
      }
      const handleSubmit = async(e) => {
        e.preventDefault()
          await axios.post(process.env.NEXT_PUBLIC_DELIVERY_APP_CREATE_ORDER_POST,{
            name:name,
            invoice:invoice,
            job:job,
            machineNo:machineNo,
            balance:balance,
            code:await generateBarcode()
          }).then((x)=>{
            if(x.data.res=="success"){
                props.func(x.data.data)
            }
          })

      };
  return (
    <div>
        <Row className='mt-4'>
            <Col md={6} xs={12}>
                <Form onSubmit={handleSubmit}>
                <div className='m-3'>
                <span className='heading-font'>Name :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={name} onChange={(e)=>setName(e.target.value)} />
                </span>
                <hr/>
                <span className='heading-font'>	Invoice No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={invoice} onChange={(e)=>setInvoice(e.target.value)} />
                </span>
                <hr/>
                <span className='heading-font'>Job No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={job} onChange={(e)=>setJob(e.target.value)} />
                </span>
                <hr/>
                <span className='heading-font'>Machine No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={machineNo} onChange={(e)=>setMachineNo(e.target.value)} />
                </span>
                <hr/>
                <span className='heading-font'>Balance :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={balance} onChange={(e)=>setBalance(e.target.value)} />
                </span>
                <hr/>
                <button className='purple-btn' type='submit' disabled={show==true?true:false}>Submit</button>
                </div>
                </Form>
            </Col>
            <Col className='m-3' style={{border:'1px solid silver'}}>
            {show &&
            <div>
                <div className='d-flex  align-items-center justify-content-center'
                    ref={(response) => (inputRef = response)}>
                <Barcode value={code}/>
                </div>
                <div className='d-flex my-3 align-items-center justify-content-center'>
                <ReactToPrint
                    className='purple-btn'
                    content={() =>inputRef}
                    trigger={() => <button className="btn btn-dark btn-sm mt-1">Print to PDF!</button>}
                />
                <span className='mx-2'>  </span> 
                <button 
                className='purple-btn'
                  onClick={()=>{
                    setBalance(""); setCode(""); setInvoice(""); setJob("");
                    setMachineNo(""); setName(""); setShow(false); 
                  }}>New Order</button>
                </div>
            </div>
            }
            </Col>
        </Row>
    </div>
  )
}

export default CreateNewOrder