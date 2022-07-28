import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import { AiFillDelete, AiFillEye, AiFillEdit } from 'react-icons/ai'
import { FaClipboardList } from 'react-icons/fa'

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

import ShowInfo from './ShowInfo';
import CreateNewOrder from './CreateNewOrder';
import Edit from './Edit';

const Orders = ({orderData}) => {

    const { confirm } = Modal;
    const [ orderList, setOrderList ] = useState([]);
    const [ viewVisible, setViewVisible ] = useState(false);
    const [ createVisible, setCreateVisible ] = useState(false);
    const [ editVisible, setEditVisible ] = useState(false);

    const [view, setView] = useState({})
    const [editValues, setEditValues] = useState({})

    useEffect(()=>{
        setOrderList(orderData);
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
        <Container className='py-5'>
            <Row>
            <Col>
                <span>
                    <FaClipboardList className='heading-font' style={{fontSize:'30px'}} />
                </span>
                <span className='heading'>Orders Page</span>
            </Col>
            <Col>
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
                    <th>Invoice{" "}No.</th>
                    <th>Job{" "}No.</th>
                    <th>Machine</th>
                    <th>Net{" "}Balance</th>
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
                    console.log(order);
                    setEditValues(order);
                    setEditVisible(true);
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
    </div>
  )
}

export default Orders