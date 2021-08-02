// BASIC TEMPLATE
import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

const TestScreen = () => {
  return (
    <>
      <Link className='btn btn-light my-3' to='/propub/B001277'>
        All Peeps
      </Link>

      <Row>
        <Col>
          <h3>status</h3>
        </Col>
      </Row>
    </>
  )
}

export default TestScreen
