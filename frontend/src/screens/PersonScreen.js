import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import axios from 'axios'

const PersonScreen = ({ match }) => {
  const [person, setPerson] = useState({})

  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await axios.get(`/api/persons/${match.params.id}`)

      setPerson(data)
    }

    fetchPerson()
  }, [match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={person.image} alt={person.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{person.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Role: {person.role}</ListGroup.Item>
            <ListGroup.Item>Party: {person.party}</ListGroup.Item>
            <ListGroup.Item>State: {person.state}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button className='btn-block btn-light' type='button'>
                      Add ROPES
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PersonScreen
