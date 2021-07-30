import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listResearchDetails } from '../actions/researchActions'

const ResearchScreen = ({ match }) => {
  const dispatch = useDispatch()

  const researchDetails = useSelector((state) => state.researchDetails)
  const { loading, error, research } = researchDetails

  useEffect(() => {
    dispatch(listResearchDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/research'>
        All Research
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={2}>
              <p>Name</p>
            </Col>
            <Col md={2}>
              <p>Title</p>
            </Col>
            <Col md={3}>
              <p>Description</p>
            </Col>
            <Col md={2}>
              <p>User</p>
            </Col>
            <Col md={2}>
              <p>Date Posted</p>
            </Col>
          </Row>
          <Row key={research._id}>
            <Col md={2}>
              <p>
                <Link to={`/person/${research?.person?._id}`}>
                  {research?.person?.name}
                </Link>
              </p>
            </Col>
            <Col md={2}>{research.title}</Col>
            <Col md={3}>
              <p>{research.description}</p>
            </Col>
            <Col md={2}>
              <p>{research.description}</p>
            </Col>
            <Col md={2}>{research.createdAt}</Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default ResearchScreen
