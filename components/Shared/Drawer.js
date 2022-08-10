import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { AiOutlineAlignLeft, AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa"
import { BsCardList } from 'react-icons/bs'
import { RiPlayListAddLine } from 'react-icons/ri'
import { FiUsers } from 'react-icons/fi'
import Link from 'next/link'

const Drawer = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
  return (
    <div>
      <div className='header'>
       <AiOutlineAlignLeft className='drawer-icon' onClick={()=>setShow(true)} />
      </div>
      <Offcanvas show={show} onHide={()=>setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div style={{marginLeft:10, marginTop:10}}>
            <FaUserCircle className='menu-profile-icon' />
            <div className='mt-2' style={{display:'inline-block', marginLeft:'10px'}}>
                <p>Waqas Khan (<span style={{fontSize:12, position:'relative', bottom:2 }}>Admin</span>)</p>
            </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
            <hr/>
        <Offcanvas.Body className=''>
        <div className='menu-link-container'>
            <BsCardList className='menu-icon' /><span><Link href="/orders"><a className="menu-links">Orders</a></Link></span>
        </div>
        <div className='menu-link-container'>
            <FiUsers className='menu-icon' /><span><Link href="/clients"><a className="menu-links">Clients</a></Link></span>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Drawer
