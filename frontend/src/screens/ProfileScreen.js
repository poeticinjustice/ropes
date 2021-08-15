import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  updateUserProfile,
  listUserResearch,
} from '../actions/userActions'
import { deleteResearch } from '../actions/researchActions'

import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ match, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const userResearchList = useSelector((state) => state.userResearchList)
  const { userResearch } = userResearchList

  const researchDelete = useSelector((state) => state.researchDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = researchDelete

  const noResearch = userResearch.length === 0

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteResearch(id))
    }
  }

  useEffect(() => {
    if (user._id) {
      dispatch(listUserResearch(user._id))
    }

    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, match, history, userInfo, user, success, successDelete])

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Research</h2>
        {noResearch ? (
          <Message>No Research Posted</Message>
        ) : (
          <Container>
            <Row>
              <Col md={5} xs={6}>
                <p>Title</p>
              </Col>
              <Col md={3} xs={12} className='d-none d-md-block'>
                <p>Date Posted</p>
              </Col>

              <Col md={4} xs={6}>
                <p>View/Edit/delete</p>
              </Col>
            </Row>

            <Row>
              <Col>
                {userResearch.map((research) => (
                  <Row key={research._id}>
                    <Col md={5} xs={6}>
                      <p>{research.title}</p>
                    </Col>
                    <Col md={3} xs={12} className='d-none d-md-block'>
                      <p>{research.createdAt.substring(0, 10)}</p>
                    </Col>
                    <Col md={4} xs={6}>
                      <Link
                        to={`/research/${research._id}`}
                        className='btn-sm btn btn-info'
                      >
                        <i className='fas fa-book'></i>
                      </Link>{' '}
                      <Link
                        to={`/research/${research._id}/edit`}
                        variant='secondary'
                        className='btn-sm'
                      >
                        <i className='fas fa-edit'></i>
                      </Link>{' '}
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(research._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Container>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
