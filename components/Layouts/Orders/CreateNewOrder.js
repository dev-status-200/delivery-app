import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form  } from 'react-bootstrap'
import ReactToPrint from 'react-to-print';
import Barcode from "react-barcode";
import axios from 'axios'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { Modal } from 'antd'

const CreateNewOrder = (props) => {

    const inputRef = useRef(null);

    const [errorVisible, setErrorVisible] = useState(false)

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
            code:job+'|'+invoice
          }).then((x)=>{
            if(x.data.res=="success"){
                generateBarcode()
                props.func(x.data.data)
            }else{
              //alert('Duplicate Invoice, Job or Machine No.')
              setErrorVisible(true);
            }
          })

      };
  return (
    <div>
        <Row className='mt-4'>
            <Col md={6} xs={12}>
              <Form onSubmit={handleSubmit}>
                <Row className='py-4'>
                  <Col md={5} xs={4}><div className='heading-font'>Name :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={5} xs={4}><div className='heading-font'>Invoice No :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}>JI-</Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={invoice} onChange={(e)=>setInvoice(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={5} xs={4}><div className='heading-font'>Job No :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}>JL-</Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={job} onChange={(e)=>setJob(e.target.value)} />
                    </div></Col>
                  <Col md={5} xs={4}><div className='heading-font'>Machine No :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={machineNo} onChange={(e)=>setMachineNo(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={5} xs={4}><div className='heading-font'>Balance :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={balance} onChange={(e)=>setBalance(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <button className='purple-btn mx-4' style={{float:'right'}} type='submit' disabled={show==true?true:false}>Submit</button>
                  </Col>
                </Row>
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
            <Modal
              visible={errorVisible}
              onOk={()=>setErrorVisible(false)}
              onCancel={()=>setErrorVisible(false)}
              centered
              footer={false}
            >
              <Row className='my-4'>
                <Col md={2} xs={2}>
                  <AiOutlineExclamationCircle color='#CB9517' style={{fontSize:50}}/>
                </Col>
                <Col md={10} xs={10}>
                <h5 style={{marginLeft:0, marginTop:10}}>
                  Duplicate Invoice, Job or Machine No.
                </h5>
                </Col>
              </Row>
          
        </Modal>
        </Row>
    </div>
  )
}

export default CreateNewOrder