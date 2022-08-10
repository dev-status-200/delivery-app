import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { AiFillDelete, AiFillEye, AiFillEdit, AiOutlineExclamationCircle, AiOutlineFileDone } from 'react-icons/ai';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { RiEBike2Line } from 'react-icons/ri';
import { FaUserFriends } from 'react-icons/fa';

import aos from 'aos';
import 'aos/dist/aos.css'   ;
import CreateNewClient from './CreateNewClient';

const Clients = ({clientData}) => {

    const { confirm } = Modal;
    const [ clientList, setClientList ] = useState([]);
    const [ createVisible, setCreateVisible ] = useState(false);

    useEffect(()=>{
        aos.init({duration:500});
        setClientList(clientData.result)
    }, []);

    const updateOrder = (x) => {
        console.log(x)
        // let tempState = [...orderList];
        // let i = tempState.findIndex((y=>x.id==y.id));
        // tempState[i] = x;
        // setClientList(tempState);
    }

    const appendClient = (x) => {
        console.log(x)
        let tempStateOne = [...clientList];
        tempStateOne.unshift(x);
        setClientList(tempStateOne);
    }

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

  return (
    <div className='layout'  style={{paddingTop:20}}>
        <Container className='py-5' data-aos="fade-in">
            <Row>
            <Col>
                <span>
                    <FaUserFriends className='heading-font' style={{fontSize:'30px'}} />
                </span>
                <span className='heading'>Clients Page</span>
            </Col>
            <Col xs={'auto'}>
                <button 
                    className='purple-btn' style={{float:'right'}}
                    onClick={()=>setCreateVisible(true)}
                >Create New</button>
            </Col>
            </Row>
            <div className='box my-3 p-4'>
            <Table responsive>
                <thead className='medium-font' style={{whiteSpace:'nowrap'}}>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Website</th>
                    <th>Modify</th>
                    </tr>
                </thead>
            <tbody className='small-font vertical-center-table'>
                {
                clientList.map((client, index)=>{
            return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{client.name}</td>
                <td>{client.address}</td>
                <td>{client.contact}</td>
                <td>{client.website}</td>
                <td>{client.email}</td>
                <td>
                <p style={{whiteSpace:'nowrap'}}>
                <span>
                <AiFillEdit className='edit-icon' />
                </span>
                    <span className='vertical-seperator'> | </span>
                <span><AiFillDelete className='delete-icon' /></span>
                </p>
                </td>
            </tr>
                )
              })
            }
            </tbody>
            </Table>
            </div>
        </Container>
        {/* Modal For Viewing Records */}
        <Modal
            visible={createVisible}
            onOk={() => setCreateVisible(false)}
            onCancel={() => setCreateVisible(false)}
            width={500}
            footer={false}
        >
            <CreateNewClient func={appendClient} setCreateVisible={setCreateVisible} />
            {/* Modal For Creating Records */}
        </Modal>
    </div>
  )
}

export default Clients