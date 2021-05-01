import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Person from '../components/Person'
import { listPersons } from '../actions/personActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const personList = useSelector((state) => state.personList)
  const { loading, error, persons } = personList

  useEffect(() => {
    dispatch(listPersons())
  }, [dispatch])

  return (
    <>
      <h1>Latest ROPES</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {persons.map((person) => (
            <Col key={person._id} sm={12} md={6} lg={4} xl={3}>
              <Person person={person} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
