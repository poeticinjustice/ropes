import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Person from '../components/Person'
import persons from '../persons'

const HomeScreen = () => {
  return (
    <>
      <h1>Latest ROPES</h1>
      <Row>
        {persons.map((person) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Person person={person} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
