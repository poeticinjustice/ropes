import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
// import { listPersonDetails } from '../actions/personActions'
// import { listResearch, createResearch } from '../actions/researchActions'

const TestScreen = ({ match }) => {
  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const researchList = useSelector((state) => state.researchList)
  const { allResearch } = researchList

  useEffect(() => {
    // if (person._id) {
    //   dispatch(listResearch())
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, allResearch, match, person._id])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        All Peeps
      </Link>
      <Container>
        <Row>
          <Col>
            {allResearch
              .slice(0)
              .reverse()
              .map((research) => (
                <Row key={research._id}>
                  <Col md={7}>
                    <p>{research.title}</p>
                  </Col>
                  <Col md={2}>
                    <p>{research.createdAt.substring(0, 10)}</p>
                  </Col>
                  <Col md={2}>
                    <p>{research.name}</p>
                  </Col>
                  <Col md={1}>
                    <button>View</button>
                  </Col>
                </Row>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TestScreen
