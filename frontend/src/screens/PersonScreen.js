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
  const { personAllResearch } = personResearchList

  const researchCreate = useSelector((state) => state.researchCreate)
  const { success: successResearch, error: errorResearch } = researchCreate

  useEffect(() => {
    if (person._id) {
      dispatch(listPersonResearch(match.params.id))
    }

    if (successResearch) {
      setTitle('')
      setDescription('')
      dispatch(listPersonDetails(match.params.id))
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
      <Link className='btn btn-light my-3' to='/research'>
        Research
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
                    <Col>Research:</Col>
                    <Col>{person.numResearch}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Container>
                <Row>
                  <Col>
                    {personAllResearch
                      .slice(0)
                      .reverse()
                      .map((research) => (
                        <Row key={research._id}>
                          <Col md={7}>
                            <p>{research.title}</p>
                          </Col>
                          <Col md={2}>
                            <p>{research.createdAt.substring(0, 10)}</p>
                          </Col>
                          <Col md={2}>
                            <p>{research.name}</p>
                          </Col>
                          <Col md={1}>
                            <button>View</button>
                          </Col>
                        </Row>
                      ))}
                  </Col>
                </Row>
              </Container>
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
