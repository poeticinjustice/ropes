import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getPropubMemberDetails } from '../actions/propubActions'

const TestScreen = ({ match }) => {
  const dispatch = useDispatch()

  const propubMemberDetails = useSelector((state) => state.propubMemberDetails)
  const { loading, error, member } = propubMemberDetails

  useEffect(() => {
    dispatch(getPropubMemberDetails(match.params.id))
  }, [dispatch, match])

  const stat = member.status

  const memberId = member.results?.map((memberDetail, memberDetailIndex) => (
    <p key={memberDetailIndex}>{memberDetail.id}</p>
  ))

  const roles = member.results?.map(
    (memberRoles) =>
      (memberRoles = memberRoles.roles?.map((memberRole, memberRoleIndex) => (
        <p key={memberRoleIndex}>{memberRole.congress}</p>
      )))
  )

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
            {memberId}
            {roles}
          </Col>
        </Row>
      )}
    </>
  )
}

export default TestScreen
