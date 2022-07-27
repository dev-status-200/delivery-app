import React, { useState, useEffect, useRef } from 'react';
import Barcode from "react-barcode";
import { useRouter } from 'next/router'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import ReactToPrint from 'react-to-print';

const GenerateBarcode = () => {
  
  const router = useRouter();
  const inputRef = useRef(null);
  
  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [invoice, setInvoice] = useState('');
  const [job, setJob] = useState('');
  const [machineNo, setMachineNo] = useState('');
  const [balance, setBalance] = useState('');

  const generateBarcode = () => {
    if(job!='' & invoice!=''){
      setCode(job+'|'+invoice);
      setShow(true);
    }
  }

  return (
    <div className='form-styles'>
      <div className='layout'>
        <Container>
          <Row className='py-5'>
            <Col className='box p-5' md={6}>
              <h1>Create Order</h1>
              <hr/>
              <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="" value={name} onChange={(e)=>setName(e.target.value)} />
              </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Invoice No.</Form.Label>
                <Row>
                  <Col md={1} className='big-label'>
                    JI-
                  </Col>
                  <Col md={11}>
                  <Form.Control type="number" value={invoice} onChange={(e)=>setInvoice(e.target.value)} />
                  </Col>
                </Row>
              </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Job No.</Form.Label>
                <Row>
                  <Col md={1} className='big-label'>
                    JL-
                  </Col>
                  <Col md={11}>
                  <Form.Control type="number" value={job} onChange={(e)=>setJob(e.target.value)} />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>GD / Machine</Form.Label>
                <Form.Control type="text" placeholder="" value={machineNo} onChange={(e)=>setMachineNo(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Net Balance</Form.Label>
                <Form.Control type="text" placeholder="" value={balance} onChange={(e)=>setBalance(e.target.value)} />
              </Form.Group>
              <Button 
                className='ml-auto px-5 mt-2'
                style={{backgroundColor:'#4E59A7', borderColor:'#4E59A7'}}
                onClick={()=>generateBarcode()}
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
                    ref={(response) => (inputRef = response)}
                  >
                    <Barcode value={code}/>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex pt-5 align-items-center justify-content-center'>
                <ReactToPrint
                    content={() =>inputRef}
                    trigger={() => <button className="btn btn-dark btn-sm mt-1">Print to PDF!</button>}
                />
                </Col>
              </Row>
              </>
             }
            </Col>
          </Row>
        </Container>
      </div>
      {/* <h1 className='' >Generate Barcode</h1>
      <input type='text' value={code} onChange={(e)=>setCode(e.target.value)} />
      <button onClick={()=>setShow(true)}>Generate Barcode</button>
      {
        show &&<Barcode value={code}/>
      } */}
    </div>
  );
};

export default GenerateBarcode;