import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listPersonDetails } from '../actions/personActions'
import { PERSON_CREATE_RESEARCH_POST_RESET } from '../constants/personConstants'

const ResearchScreen = ({ match }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const personResearchPostCreate = useSelector(
    (state) => state.personResearchPostCreate
  )
  const { success: successPersonResearchPost, error: errorPersonResearchPost } =
    personResearchPostCreate

  useEffect(() => {
    if (successPersonResearchPost) {
      setTitle('')
      setDescription('')
      dispatch(listPersonDetails(match.params.id))
    }
    if (!person._id || person._id !== match.params.id) {
      dispatch(listPersonDetails(match.params.id))
      dispatch({ type: PERSON_CREATE_RESEARCH_POST_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, match, successPersonResearchPost])

  return (
    <>
      <Meta title={person.name} />
      <Link className='btn btn-light my-3' to='/'>
        List
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Image src={person.image} alt={person.name} fluid />
            </Col>
            <Col>
              <Container>
                {person.researchPosts.length > 0 ? (
                  <Row>
                    <Col md={7}>
                      <h3>Title</h3>
                    </Col>
                    <Col md={1}>
                      <h3>View</h3>
                    </Col>
                  </Row>
                ) : (
                  <Message>No Research Posted</Message>
                )}
                {person.researchPosts
                  .slice(0)
                  .reverse()
                  .map((researchPost) => (
                    <Row key={researchPost._id}>
                      <Col md={7}>
                        <p>{researchPost.title}</p>
                      </Col>
                      <Col md={1}>
                        <button>View</button>
                      </Col>
                    </Row>
                  ))}
              </Container>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ResearchScreen
