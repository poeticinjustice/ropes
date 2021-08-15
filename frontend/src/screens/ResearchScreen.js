import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Row, Col } from 'react-bootstrap'
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
      <Link
        className='btn btn-light my-3'
        to={`/person/${research?.person?._id}`}
      >
        {research?.person?.first_name} {research?.person?.last_name}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={
                  research.image
                    ? research.image
                    : 'https://ropesapp.herokuapp.com/uploads/image-1628984002290.jpg'
                }
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src =
                    'https://ropesapp.herokuapp.com/uploads/image-1628984002290.jpg'
                }}
                alt={research.title}
                fluid
              />
            </Col>
            <Col md={6}>
              <Row>
                <Col className='d-none d-md-block'>
                  Name: {research.person?.first_name}{' '}
                  {research.person?.last_name}
                </Col>
              </Row>
              <Row>
                <Col className='d-none d-md-block'>Title: {research.title}</Col>
              </Row>
              <Row>
                <Col className='d-none d-md-block'>
                  Description: {research.description}
                </Col>
              </Row>
              <Row>
                <Col className='d-none d-md-block'>
                  Link:{' '}
                  <a href={research.link} target='_blank' rel='noreferrer'>
                    {research?.link?.split('http://').pop()}
                  </a>
                </Col>
              </Row>
              <Row>
                <Col className='d-none d-md-block'>
                  Posted By: {research.user?.name}
                </Col>
              </Row>
              <Row>
                <Col className='d-none d-md-block'>
                  Date Posted: {research.createdAt?.substring(0, 10)}
                </Col>
              </Row>
            </Col>
          </Row>

          <Link
            className='btn btn-light my-3'
            to={`/research/${research._id}/edit`}
          >
            Edit
          </Link>
        </>
      )}
    </>
  )
}

export default ResearchScreen
