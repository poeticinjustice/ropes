import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'
import {
  getPropubMemberDetails,
  updatePersonFromPropub,
} from '../actions/propubActions'

const Propub = ({ match }) => {
  const personId = match.params.id
  const [propubId, setPropubId] = useState('')

  const dispatch = useDispatch()

  const propubMemberDetails = useSelector((state) => state.propubMemberDetails)
  const { member } = propubMemberDetails

  useEffect(() => {
    dispatch(getPropubMemberDetails(match.params.id))
  }, [dispatch, match])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePersonFromPropub({
        _id: personId,
        propubId,
      })
    )
  }

  // const memberId = member.results?.map((memberDetail, memberDetailIndex) => (
  //   <p key={memberDetailIndex}>ID: {memberDetail.id}</p>
  // ))

  // const stat = member.status

  return (
    <Row>
      <Col>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='propubId'>
            <Form.Label>ProPublica ID</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter ProPublica ID'
              value={propubId}
              onChange={(e) => setPropubId(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default Propub
