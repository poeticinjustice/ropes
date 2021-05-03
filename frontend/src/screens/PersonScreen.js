import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPersonDetails } from '../actions/personActions'

const PersonScreen = ({ match }) => {
  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  useEffect(() => {
    dispatch(listPersonDetails(match.params.id))
  }, [dispatch, match])

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
                <ListGroupItem>
                  <Row>
                    <Col>Ropes:</Col>
                    <Col>{person.numResearchPosts}</Col>
                  </Row>
                </ListGroupItem>
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
      )}
    </>
  )
}

export default PersonScreen
