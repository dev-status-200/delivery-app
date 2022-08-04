import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form  } from 'react-bootstrap'
import ReactToPrint from 'react-to-print';
import Barcode from "react-barcode";
import axios from 'axios'
import { useSetState } from 'react-use';

const Edit = ({editValues, updateOrder}) => {

    const inputRef = useRef(null);

    const [show, setShow] = useState(false);

    const [state, setState] = useSetState({
        values:{id:'', name:'', code:'', invoice:'', job:'', machineNo:'', balance:''}
    })
    
    useEffect(() => {
        setState({
            id:editValues.id,
            name:editValues.name,
            code:editValues.code,
            invoice:editValues.invoice,
            job:editValues.job,
            machineNo:editValues.machineNo,
            balance:editValues.balance
        });
    }, [editValues])
    
    const generateBarcode = () => {
        let value = '';
        if(state.job!='' & state.invoice!=''){
          value=state.job+'|'+state.invoice;
          setState({code:state.job+'|'+state.invoice});
          setShow(true);
        }
        return value
      }
      const handleSubmit = async(e) => {
        e.preventDefault();
          await axios.put(process.env.NEXT_PUBLIC_DELIVERY_APP_EDIT_ORDER_PUT,{
            id:state.id,
            name:state.name,
            invoice:state.invoice,
            job:state.job,
            machineNo:state.machineNo,
            balance:state.balance,
            code:await generateBarcode()
          }).then((x)=>{
            if(x.data.res=="success"){
                updateOrder({
                    id:state.id,
                    name:state.name,
                    invoice:state.invoice,
                    job:state.job,
                    machineNo:state.machineNo,
                    balance:state.balance,
                    code:state.job+'|'+state.invoice,
                    status:'pending',
                    active:1
                })
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
                    <Form.Control type="text" required value={state.name} onChange={(e)=>setState({name:e.target.value})} />
                </span>
                <hr/>
                <span className='heading-font'>	Invoice No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={state.invoice} onChange={(e)=>setState({invoice:e.target.value})} />
                </span>
                <hr/>
                <span className='heading-font'>Job No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={state.job} onChange={(e)=>setState({job:e.target.value})} />
                </span>
                <hr/>
                <span className='heading-font'>Machine No :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={state.machineNo} onChange={(e)=>setState({machineNo:e.target.value})} />
                </span>
                <hr/>
                <span className='heading-font'>Balance :</span>
                <span className='heading-font-thin' style={{float:'right'}}>
                    <Form.Control type="text" required value={state.balance} onChange={(e)=>setState({balance:e.target.value})} />
                </span>
                <hr/>
                <button className='purple-btn' type='submit'>Submit</button>
                </div>
                </Form>
            </Col>
            <Col className='m-3' style={{border:'1px solid silver'}}>
            {show &&
            <div>
                <div className='d-flex  align-items-center justify-content-center'
                    ref={(response) => (inputRef = response)}>
                <Barcode value={state.code}/>
                </div>
                <div className='d-flex my-3 align-items-center justify-content-center'>
                <ReactToPrint
                    className='purple-btn'
                    content={() =>inputRef}
                    trigger={() => <button className="btn btn-dark btn-sm mt-1">Print to PDF!</button>}
                />
                </div>
            </div>
            }
            </Col>
        </Row>
    </div>
  )
}

export default Edit