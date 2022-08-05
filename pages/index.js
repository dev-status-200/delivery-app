import React from 'react'
import { Spinner, Row, Col, Container } from 'react-bootstrap'
import Router from 'next/router'
import Test from '../components/Layouts/Test'
const Home = () => {

  React.useEffect(() => {
    const timer = setTimeout(() => {
      Router.push('/orders')
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    // <>
    // <Test/>
    // </>
      <Container>
        <Row>
          <Col>
            <div className='loader-spinner'>
              <Spinner animation="border" size='xl' role="status" />
            </div>
          </Col>
        </Row>
      </Container>
  )
}

export default Home
