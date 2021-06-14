import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, Card, ListGroup, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listPersonDetails,
  createPersonResearchPost,
} from '../actions/personActions'
import { PERSON_CREATE_RESEARCH_POST_RESET } from '../constants/personConstants'

const PersonScreen = ({ match }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const personResearchPostCreate = useSelector(
    (state) => state.personResearchPostCreate
  )
  const {
    success: successPersonResearchPost,
    loading: loadingPersonResearchPost,
    error: errorPersonResearchPost,
  } = personResearchPostCreate

  useEffect(() => {
    if (successPersonResearchPost) {
      setTitle('')
      setDescription('')
    }
    if (!person._id || person._id !== match.params.id) {
      dispatch(listPersonDetails(match.params.id))
      dispatch({ type: PERSON_CREATE_RESEARCH_POST_RESET })
    }
  }, [dispatch, match, successPersonResearchPost])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createPersonResearchPost(match.params.id, {
        title,
        description,
      })
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={person.image} alt={person.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{person.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {person.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Ropes:</Col>
                      <Col>{person.numResearchPosts}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Button
                          className='btn-block btn-light btn-outline-secondary'
                          type='button'
                        >
                          Add ROPES
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Research</h2>
              {person.researchPosts.length === 0 && (
                <Message>No Research Posted</Message>
              )}
              <ListGroup variant='flush'>
                {person.researchPosts.map((researchPost) => (
                  <ListGroup.Item key={researchPost._id}>
                    <strong>{researchPost.name}</strong>
                    <p>{researchPost.createdAt.substring(0, 10)}</p>
                    <p>{researchPost.title}</p>
                    <p>{researchPost.description}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Post Research</h2>
                  {successPersonResearchPost && (
                    <Message variant='success'>
                      Research posted successfully
                    </Message>
                  )}
                  {loadingPersonResearchPost && <Loader />}
                  {errorPersonResearchPost && (
                    <Message variant='danger'>
                      {errorPersonResearchPost}
                    </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          as='input'
                          row='1'
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingPersonResearchPost}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> post research{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PersonScreen
