import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listPersons,
  deletePerson,
  createPerson,
} from '../actions/personActions'
import { PERSON_CREATE_RESET } from '../constants/personConstants'

const PersonListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const personList = useSelector((state) => state.personList)
  const { loading, error, persons } = personList

  const personDelete = useSelector((state) => state.personDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = personDelete

  const personCreate = useSelector((state) => state.personCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    person: createdPerson,
  } = personCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PERSON_CREATE_RESET })

    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/person/${createdPerson._id}/edit`)
    } else {
      dispatch(listPersons())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdPerson])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deletePerson(id))
    }
  }

  const createPersonHandler = () => {
    dispatch(createPerson())
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
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
              <th>ROLE</th>
              <th>PARTY</th>
              <th>STATE</th>
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
