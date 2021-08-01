import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const TestScreen = () => {
  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        All Peeps
      </Link>

      <Container>
        <Row>
          <Col md={3}>
            <p>Name</p>
          </Col>
          <Col md={3}>
            <p>Title</p>
          </Col>
          <Col md={3}>
            <p>Description</p>
          </Col>
          <Col md={2}>
            <p>Date Posted</p>
          </Col>
          <Col md={1}>
            <p>View</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TestScreen
