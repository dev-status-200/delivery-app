import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'

const Orders = ({orderData}) => {

    const [orderList, setOrderList] = useState([]);

    useEffect(()=>{
        console.log(orderData)
        setOrderList(orderData);
    },[])

  return (
    <div className="order-styles">
        <div className='layout py-5'>
            <Container className="box p-5">
            <h1>Orders</h1>
            <Table responsive hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Invoice No.</th>
                    <th>Job No.</th>
                    <th>Machine</th>
                    <th>Net Balance</th>
                    <th>Barcode</th>
                    <th>Modify</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderList.map((order, index)=>{
                            return(
                            <tr>
                            <td>{index+1}</td>
                            <td>{order.name}</td>
                            <td>JI-{order.invoice}</td>
                            <td>JI-{order.job}</td>
                            <td>{order.machineNo}</td>
                            <td>{order.balance}</td>
                            <td>{order.code}</td>
                            <td>{order.code}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            </Container>
        </div>
    </div>
  )
}

export default Orders