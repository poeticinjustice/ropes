import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPersons } from '../actions/personActions'

const PersonListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const personList = useSelector((state) => state.personList)
  const { loading, error, persons } = personList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPersons())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      // DELETE PERSONS
    }
  }

  const createPersonHandler = (person) => {
    //   CREATE PERSON
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Persons</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createPersonHandler}>
            <i className='fas fa-plus'></i> Create Person
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person._id}>
                <td>{person._id}</td>
                <td>{person.name}</td>
                <td>{person.role}</td>
                <td>{person.party}</td>
                <td>{person.state}</td>
                <td>
                  <LinkContainer to={`/admin/person/${person._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(person._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default PersonListScreen
