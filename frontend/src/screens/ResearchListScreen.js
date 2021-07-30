import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listResearch } from '../actions/researchActions'

const ResearchListScreen = () => {
  const dispatch = useDispatch()

  const researchList = useSelector((state) => state.researchList)
  const { loading, error, research } = researchList

  useEffect(() => {
    dispatch(listResearch())
  }, [dispatch])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        All Peeps
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          {research.length === 0 && <Message>No Research Posted</Message>}
          <Row>
            <Col md={2} xs={12} className='d-none d-md-block'>
              <p>Person</p>
            </Col>
            <Col md={2} xs={9}>
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
            <Col md={1} xs={3}>
              <p>View</p>
            </Col>
          </Row>
          {research
            .slice(0)
            .reverse()
            .map((researchData) => (
              <Row key={researchData._id}>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{researchData.person?.name}</p>
                </Col>
                <Col md={2} xs={9}>
                  <p>{researchData.title}</p>
                </Col>
                <Col md={3} xs={12} className='d-none d-md-block'>
                  <p>{researchData.description}</p>
                </Col>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{researchData.user?.name}</p>
                </Col>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{researchData.createdAt.substring(0, 10)}</p>
                </Col>
                <Col md={1} xs={3}>
                  <Link to={`/research/${researchData._id}`}>
                    <button>View</button>
                  </Link>
                </Col>
              </Row>
            ))}
        </Container>
      )}
    </>
  )
}

export default ResearchListScreen
