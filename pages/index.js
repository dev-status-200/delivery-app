import React from 'react'
import { Spinner, Row, Col, Container } from 'react-bootstrap'
import Router from 'next/router'
const home = () => {

  React.useEffect(() => {
    const timer = setTimeout(() => {
      Router.push('/orders')
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
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

export default home
