import React, { useState, useEffect, useRef } from 'react';
import Barcode from "react-barcode";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

const GenerateOrder = () => {

  const inputRef = useRef(null);
  const [validated, setValidated] = useState(false);
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
  const handleSubmit = async(event) => {
    event.preventDefault()
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      await axios.post(process.env.NEXT_PUBLIC_DELIVERY_APP_CREATE_ORDER_POST,{
        name:name,
        invoice:invoice,
        job:job,
        machineNo:machineNo,
        balance:balance,
        code:await generateBarcode()
      })
    }
    setValidated(true);
  };

  return (
    <div className='form-styles'>
      <div className='layout'>
        <Container>
          <Row className='py-5'>
            <Col className='box p-5' md={6}>
              <h1>Create Order</h1><hr/>
              <Form validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" required placeholder="" value={name} onChange={(e)=>setName(e.target.value)} />
              </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Invoice No.</Form.Label>
                <Row>
                  <Col md={1} className='big-label'>JI-</Col>
                  <Col md={11}>
                  <Form.Control type="number" required value={invoice} onChange={(e)=>setInvoice(e.target.value)} />
                  </Col>
                </Row>
              </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Job No.</Form.Label>
                <Row>
                  <Col md={1} className='big-label'>JL-</Col>
                  <Col md={11}>
                  <Form.Control type="number" required value={job} onChange={(e)=>setJob(e.target.value)} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>GD / Machine</Form.Label>
                <Form.Control type="text" placeholder="" required value={machineNo} onChange={(e)=>setMachineNo(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Net Balance</Form.Label>
                <Form.Control type="text" placeholder="" required value={balance} onChange={(e)=>setBalance(e.target.value)} />
              </Form.Group>
              <Button 
                className='ml-auto px-5 mt-2'
                type="submit"
                style={{backgroundColor:'#4E59A7', borderColor:'#4E59A7'}}
                >Submit</Button>
              </Form>
            </Col>
            <Col md={1}></Col>
            <Col className='box p-5' md={5}>
            {
              show &&
              <>
              <Row>
                <Col md={12} className='d-flex mt-5 pt-5 align-items-center justify-content-center'
                    ref={(response) => (inputRef = response)}>
                    <Barcode value={code}/>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='d-flex pt-5 align-items-center justify-content-center'>
                <ReactToPrint
                    content={() =>inputRef}
                    trigger={() => <button className="btn btn-dark btn-sm mt-1">Print to PDF!</button>}
                />
                </Col>
                <Col md={12} className='d-flex mt-2 align-items-center justify-content-center'>
                <Button 
                  style={{paddingLeft:'13px', paddingRight:'13px', backgroundColor:'#4E59A7', borderColor:'#4E59A7'}} size="sm"
                  onClick={()=>{
                    setValidated(false);
                    setBalance("");
                    setCode("");
                    setInvoice("");
                    setJob("");
                    setMachineNo("");
                    setName("");
                    setShow(false); 
                  }}>New Order</Button>
                </Col>
              </Row>
              </>
             }
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default GenerateOrder;