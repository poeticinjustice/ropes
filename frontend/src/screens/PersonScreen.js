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
import { listPersonDetails, listPersonResearch } from '../actions/personActions'
import { createResearch } from '../actions/researchActions'
import { RESEARCH_CREATE_RESET } from '../constants/researchConstants'

const PersonScreen = ({ match }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const personResearchList = useSelector((state) => state.personResearchList)
  const { personResearch } = personResearchList

  const researchCreate = useSelector((state) => state.researchCreate)
  const { success: successResearch, error: errorResearch } = researchCreate

  const noResearch = personResearch.length === 0

  useEffect(() => {
    if (person._id) {
      dispatch(listPersonResearch(match.params.id))
    }

    if (successResearch) {
      setTitle('')
      setDescription('')
      dispatch({ type: RESEARCH_CREATE_RESET })
    }
    if (!person._id || person._id !== match.params.id) {
      dispatch(listPersonDetails(match.params.id))
      dispatch({ type: RESEARCH_CREATE_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listPersonResearch, match, person._id, successResearch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createResearch(match.params.id, {
        title,
        description,
      })
    )
  }

  return (
    <>
      <Meta title={person.name} />
      <Link className='btn btn-light my-3' to='/'>
        All Peeps
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Image
                src={`https://theunitedstates.io/images/congress/225x275/${person.propub_id}.jpg`}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src =
                    'https://ropesapp.herokuapp.com/uploads/image-1628982927716.png'
                }}
                alt={person.name}
                fluid
              />
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{`${person.first_name} ${person.last_name}`}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  {person.party} from {person.state}
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {person.description}
                </ListGroup.Item>
                <ListGroup>
                  <Link
                    className='btn btn-dark my-3'
                    to={`/person/${person._id}/edit`}
                  >
                    Edit
                  </Link>
                </ListGroup>
              </ListGroup>
            </Col>
            <Col>
              {noResearch ? (
                <Message>No Research Posted</Message>
              ) : (
                <Container>
                  <Row>
                    <Col md={4} xs={9}>
                      <p>Title</p>
                    </Col>
                    <Col md={5} xs={12} className='d-none d-md-block'>
                      <p>Description</p>
                    </Col>
                    <Col md={2} xs={12} className='d-none d-md-block'>
                      <p>Date Posted</p>
                    </Col>

                    <Col md={1} xs={3}>
                      <p>View</p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {personResearch
                        .slice(0)
                        .reverse()
                        .map((research) => (
                          <Row key={research._id}>
                            <Col md={4} xs={9}>
                              <p>{research.title}</p>
                            </Col>
                            <Col md={5} xs={12} className='d-none d-md-block'>
                              <p>{research.description}</p>
                            </Col>
                            <Col md={2} xs={12} className='d-none d-md-block'>
                              <p>{research.createdAt.substring(0, 10)}</p>
                            </Col>
                            <Col md={1} xs={3}>
                              <Link to={`/research/${research._id}`}>
                                <button>View</button>
                              </Link>
                            </Col>
                          </Row>
                        ))}
                    </Col>
                  </Row>
                </Container>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              {successResearch && (
                <Message variant='success'>
                  Research posted successfully
                </Message>
              )}
              <ListGroup>
                <ListGroup.Item>
                  <h3>
                    <center>Post Research</center>
                  </h3>
                  {errorResearch && (
                    <Message variant='danger'>{errorResearch}</Message>
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
                      Please <Link to='/login'>sign in</Link> to post research{' '}
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
