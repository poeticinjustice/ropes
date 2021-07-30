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
            <Col md={2} xs={12} className='d-none d-md-block'>
              <p>Name</p>
            </Col>
            <Col md={3} xs={12} className='d-none d-md-block'>
              <p>Title</p>
            </Col>
            <Col md={3} xs={12} className='d-none d-md-block'>
              <p>Description</p>
            </Col>
            <Col md={2} xs={12} className='d-none d-md-block'>
              <p>Posted By</p>
            </Col>
            <Col md={2} xs={12} className='d-none d-md-block'>
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
            <Col md={3} xs={12} className='d-none d-md-block'>
              {research.title}
            </Col>
            <Col md={3} xs={12} className='d-xs-block d-md-none'>
              <p>Title: {research.title}</p>
            </Col>
            <Col md={3} xs={12} className='d-none d-md-block'>
              <p>{research.description}</p>
            </Col>
            <Col md={3} xs={12} className='d-xs-block d-md-none'>
              <p>Description: {research.description}</p>
            </Col>
            <Col md={2} xs={12} className='d-none d-md-block'>
              <p>{research.user?.name}</p>
            </Col>
            <Col md={2} xs={12} className='d-xs-block d-md-none'>
              <p>Posted By: {research.user?.name}</p>
            </Col>
            <Col md={2} className='d-none d-md-block'>
              {research.createdAt?.substring(0, 10)}
            </Col>
            <Col md={2} xs={12} className='d-xs-block d-md-none'>
              <p>Date Posted: {research.createdAt?.substring(0, 10)}</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default ResearchScreen
