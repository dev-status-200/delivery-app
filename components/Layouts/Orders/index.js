import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { AiFillDelete, AiFillEye, AiFillEdit, AiOutlineExclamationCircle, AiOutlineFileDone } from 'react-icons/ai'
import { FaClipboardList } from 'react-icons/fa'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import { RiEBike2Line } from 'react-icons/ri'

import ShowInfo from './ShowInfo';
import CreateNewOrder from './CreateNewOrder';
import Edit from './Edit';

import aos from 'aos'
import 'aos/dist/aos.css'
import FileUpload from './FileUpload';

const Orders = ({orderData}) => {

    const { confirm } = Modal;
    const [ orderList, setOrderList ] = useState([]);
    const [ viewVisible, setViewVisible ] = useState(false);
    const [ createVisible, setCreateVisible ] = useState(false);
    const [ editVisible, setEditVisible ] = useState(false);
    const [ fileVisible, setFileVisible ] = useState(false);

    const [view, setView] = useState({})
    const [editValues, setEditValues] = useState({})

    useEffect(()=>{
        setOrderList(orderData);
        aos.init({duration:500});
    }, []);

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
    const appendOrder = (x) => {
        let tempStateOne = [...orderList];
        tempStateOne.unshift(x);
        setOrderList(tempStateOne);
    }
    const updateOrder = (x) => {
        console.log(x)
        let tempState = [...orderList];
        let i = tempState.findIndex((y=>x.id==y.id));
        tempState[i] = x;
        setOrderList(tempState);
    }
  return (
    <div className='layout'  style={{paddingTop:20}}>
        <Container className='py-5' data-aos="fade-in">
            <Row>
            <Col>
                <span>
                    <FaClipboardList className='heading-font' style={{fontSize:'30px'}} />
                </span>
                <span className='heading'>Orders Page</span>
            </Col>
            <Col xs={'auto'}>
                <button 
                    className='purple-btn' style={{float:'right'}}
                    onClick={()=>setCreateVisible(true)}
                >Create New</button>
                <button 
                    className='purple-btn mx-2' style={{float:'right'}}
                    onClick={()=>setFileVisible(true)}
                >Upload File</button>
            </Col>
            </Row>
            <div className='box my-3 p-4'>
            <Table responsive>
                <thead className='medium-font' style={{whiteSpace:'nowrap'}}>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Invoice{" "}No.</th>
                    <th>Job{" "}No.</th>
                    <th>Machine</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Barcode</th>
                    <th>Modify</th>
                    </tr>
                </thead>
                <tbody className='small-font vertical-center-table'>
                {
                orderList.map((order, index)=>{
            return(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{order.name}</td>
                <td>JI-{order.invoice}</td>
                <td>JI-{order.job}</td>
                <td>{order.machineNo}</td>
                <td>{order.balance}</td>
                <td>
                    {order.status=='pending'&& 
                        <>
                            <span><AiOutlineExclamationCircle className='pending-icon' /></span>
                            <span className='mx-1 pending-text'>Pending</span>
                        </>
                    }
                    {order.status=='pipeline'&& 
                        <>
                            <span><RiEBike2Line className='pipeline-icon' /></span>
                            <span className='mx-1 pipeline-text'>On The Way!</span>
                        </>
                    }
                    {order.status=='complete'&& 
                        <>
                            <span><AiOutlineFileDone className='complete-icon' /></span>
                            <span className='mx-1 complete-text'>Completed!</span>
                        </>
                    }
                </td>
                <td>{order.code}</td>
                <td>
                <p style={{whiteSpace:'nowrap'}}>
                <span>
                <AiFillEye className='view-icon'
                    onClick={()=>{
                        setView(order); setViewVisible(true);
                }} />
                </span>
                    <span className='vertical-seperator'> | </span>
                <span>
                <AiFillEdit className='edit-icon' onClick={()=>{
                    if(order.status=='pending'){
                        setEditValues(order);
                        setEditVisible(true);
                    }else{
                        alert('Live Orders cannot be changed');
                    }
                }} />
                </span>
                    <span className='vertical-seperator'> | </span>
                <span><AiFillDelete className='delete-icon' onClick={showConfirm}/></span>
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
            visible={viewVisible}
            onOk={() => setViewVisible(false)}
            onCancel={() => setViewVisible(false)}
            width={1000}
            footer={false}
        >
            <ShowInfo view={view}/>
            {/* Modal For Creating Records */}
        </Modal>
        {/* Modal For Creating Records */}
        <Modal
            visible={createVisible}
            onOk={() => setCreateVisible(false)}
            onCancel={() => setCreateVisible(false)}
            width={1000}
            footer={false}
        >
            <CreateNewOrder func={appendOrder} />
        </Modal>
        {/* Modal For Editing Records */}
        <Modal
            visible={editVisible}
            onOk={() => setEditVisible(false)}
            onCancel={() => setEditVisible(false)}
            width={1000}
            footer={false}
        >
            {editVisible && <Edit editValues={editValues} updateOrder={updateOrder} />}
        </Modal>
        {/* Modal For Uploading File */}
        <Modal
            visible={fileVisible}
            onOk={() => setFileVisible(false)}
            onCancel={() => setFileVisible(false)}
            width={1000}
            footer={false}
        >
            {fileVisible && <FileUpload/>}
        </Modal>
    </div>
  )
}

export default Orders