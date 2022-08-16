import React, { useState } from 'react';
import { Row, Col, Form, Spinner  } from 'react-bootstrap';
import axios from 'axios';

const CreateNewClient = (props) => {

    const [errorVisible, setErrorVisible] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [website, setWebsite] = useState('');
    
    const [load, setLoad] = useState(false);

      const handleSubmit = async(e) => {
        setLoad(true)
        e.preventDefault()
        await axios.post(process.env.NEXT_PUBLIC_DELIVERY_APP_CREATE_CLIENT_POST,{
          name:name.trim(),
          email:email,
          contact:contact,
          address:address,
          website:website
        }).then((x)=>{
          if(x.data.res=="success"){
              console.log(x.data);
              props.func(x.data.data);
              setName(""); setEmail(""); setContact(""); setAddress(""); setWebsite("");
              setLoad(false);
              props.setCreateVisible(false);
          }else{
            setErrorVisible(true);
            setLoad(false);
            }
          })

      };

  return (
    <div>
        <Row className='mt-4'>
            <Col md={12} xs={12}>
              <Form onSubmit={handleSubmit}>
                <Row className='py-4'>
                  <Col md={5} xs={4}><div className='heading-font'>Name :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={6} xs={6}><div className='heading-font'>Address :</div></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={address} onChange={(e)=>setAddress(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={6} xs={6}><div className='heading-font'>Contact :</div></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={contact} onChange={(e)=>setContact(e.target.value)} />
                    </div></Col>
                  <Col md={5} xs={4}><div className='heading-font'>Email :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                  </Col>
                  <Col md={5} xs={4}><div className='heading-font'>Website :</div></Col>
                  <Col md={1} xs={2} style={{padding:'6px 0px 0px 20px'}}></Col>
                  <Col md={6} xs={6}>
                    <div className='heading-font-thin'>
                    <Form.Control type="text" required value={website} onChange={(e)=>setWebsite(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <button className='purple-btn mx-4 mt-2' style={{float:'right'}} type='submit'
                      disabled={load?true:false}
                    >{load?<Spinner animation="border" className='mx-3' size="sm" />:"Submit"}</button>
                  </Col>
                </Row>
              </Form>
            </Col>
        </Row>
    </div>
  )
}

export default CreateNewClient