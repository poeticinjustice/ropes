import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listResearch, deleteResearch } from '../actions/researchActions'

const ResearchListScreen = () => {
  const dispatch = useDispatch()

  const researchList = useSelector((state) => state.researchList)
  const { loading, error, research } = researchList

  const researchDelete = useSelector((state) => state.researchDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = researchDelete

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteResearch(id))
    }
  }

  useEffect(() => {
    dispatch(listResearch())
  }, [dispatch, successDelete])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        All Peeps
      </Link>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
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
            <Col md={2} xs={12} className='d-none d-md-block'>
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
            <Col md={1} xs={3}>
              <p>Delete</p>
            </Col>
          </Row>
          {research
            .slice(0)
            .reverse()
            .map((research) => (
              <Row key={research._id}>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{research.person?.name}</p>
                </Col>
                <Col md={2} xs={9}>
                  <p>{research.title}</p>
                </Col>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{research.description}</p>
                </Col>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{research.user?.name}</p>
                </Col>
                <Col md={2} xs={12} className='d-none d-md-block'>
                  <p>{research.createdAt.substring(0, 10)}</p>
                </Col>
                <Col md={1} xs={3}>
                  <Link to={`/research/${research._id}`}>
                    <button>View</button>
                  </Link>
                </Col>
                <Col md={1} xs={0}>
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
        </Container>
      )}
    </>
  )
}

export default ResearchListScreen
