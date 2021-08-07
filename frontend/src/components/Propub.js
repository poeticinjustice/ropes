import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { listPropubMemberDetails } from '../actions/propubActions'

const Propub = ({ match }) => {
  const dispatch = useDispatch()

  const propubMemberDetails = useSelector((state) => state.propubMemberDetails)
  const { member } = propubMemberDetails

  useEffect(() => {
    dispatch(listPropubMemberDetails(match.params.id))
  }, [dispatch, match])

  const memberId = member.results?.map((memberDetail, memberDetailIndex) => (
    <p key={memberDetailIndex}>ID: {memberDetail.id}</p>
  ))

  const stat = member.status

  return (
    <>
      <Row>
        <Col>
          <h3>status: {stat}</h3>
          <h3>{memberId}</h3>
        </Col>
      </Row>
    </>
  )
}

export default Propub
