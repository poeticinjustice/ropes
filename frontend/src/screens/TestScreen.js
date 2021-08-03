import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listPropubMemberDetails } from '../actions/propubActions'

const TestScreen = ({ match }) => {
  const dispatch = useDispatch()

  const propubMemberDetails = useSelector((state) => state.propubMemberDetails)
  const { loading, error, member } = propubMemberDetails

  useEffect(() => {
    dispatch(listPropubMemberDetails(match.params.id))
  }, [dispatch, match])

  const stat = member.status

  const memberId = member.results?.map((item, index) => (
    <p key={index}>{item.id}</p>
  ))

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
        <Row>
          <Col>
            <h3>status: {stat}</h3>
            <p>{memberId}</p>
          </Col>
        </Row>
      )}
    </>
  )
}

export default TestScreen
