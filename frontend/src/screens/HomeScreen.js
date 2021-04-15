import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Person from '../components/Person'
import axios from 'axios'

const HomeScreen = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await axios.get('/api/persons')

      setPersons(data)
    }

    fetchPersons()
  }, [])

  return (
    <>
      <h1>Latest ROPES</h1>
      <Row>
        {persons.map((person) => (
          <Col key={person._id} sm={12} md={6} lg={4} xl={3}>
            <Person person={person} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default HomeScreen
