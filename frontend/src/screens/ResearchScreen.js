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
            <Col md={6} xs={12}>
              <Image
                src={
                  research.image
                    ? research.image
                    : 'https://i.ibb.co/1TZRzcD/research-stock.jpg'
                }
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://i.ibb.co/1TZRzcD/research-stock.jpg'
                }}
                alt={research.title}
                fluid
              />
            </Col>
            <Col md={6} xs={12}>
              <Row>
                <Col>
                  <p>
                    Name: {research.person?.first_name}{' '}
                    {research.person?.last_name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Title: {research.title}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Description: {research.description}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    Link:{' '}
                    <a href={research.link} target='_blank' rel='noreferrer'>
                      {research?.link?.split('http://').pop()}
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Posted By: {research.user?.name}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Date Posted: {research.createdAt?.substring(0, 10)}</p>
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
