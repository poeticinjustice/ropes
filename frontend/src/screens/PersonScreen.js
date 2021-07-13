import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
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
  const { success: successPersonResearchPost, error: errorPersonResearchPost } =
    personResearchPostCreate

  useEffect(() => {
    if (successPersonResearchPost) {
      setTitle('')
      setDescription('')
      dispatch(listPersonDetails(match.params.id))
    }
    if (!person._id || person._id !== match.params.id) {
      dispatch(listPersonDetails(match.params.id))
      dispatch({ type: PERSON_CREATE_RESEARCH_POST_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Meta title={person.name} />
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
            <Col md={3}>
              <Image src={person.image} alt={person.name} fluid />
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{person.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {person.party} from {person.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {person.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Ropes:</Col>
                    <Col>{person.numResearchPosts}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Container>
                <Row>
                  <Col md={7}>
                    <h3>Title</h3>
                  </Col>
                  <Col md={2}>
                    <h3>Updated</h3>
                  </Col>
                  <Col md={2}>
                    <h3>Updater</h3>
                  </Col>
                  <Col md={1}>
                    <h3>View</h3>
                  </Col>
                </Row>

                {person.researchPosts
                  .slice(0)
                  .reverse()
                  .map((researchPost) => (
                    <Row key={researchPost._id}>
                      <Col md={7}>
                        <p>{researchPost.title}</p>
                      </Col>
                      <Col md={2}>
                        <p>{researchPost.createdAt.substring(0, 10)}</p>
                      </Col>
                      <Col md={2}>
                        <p>{researchPost.name}</p>
                      </Col>
                      <Col md={1}>
                        <button>View</button>
                      </Col>
                    </Row>
                  ))}
              </Container>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {successPersonResearchPost && (
                <Message variant='success'>
                  Research posted successfully
                </Message>
              )}
              {person.researchPosts.length === 0 && (
                <Message>No Research Posted</Message>
              )}
              <ListGroup>
                <ListGroup.Item>
                  <h3>
                    <center>Post Research</center>
                  </h3>
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
                      <Button type='submit' variant='primary'>
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
