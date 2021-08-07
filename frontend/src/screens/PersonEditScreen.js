import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPersonDetails, updatePerson } from '../actions/personActions'
import { listPropubMemberDetails } from '../actions/propubActions'
import { PERSON_UPDATE_RESET } from '../constants/personConstants'

const PersonEditScreen = ({ match, history }) => {
  const personId = match.params.id
  const [propubId, setPropubId] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [state, setState] = useState('')
  const [party, setParty] = useState('')
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const personDetails = useSelector((state) => state.personDetails)
  const { loading, error, person } = personDetails

  const personUpdate = useSelector((state) => state.personUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = personUpdate

  const propubMemberDetails = useSelector((state) => state.propubMemberDetails)
  const {
    loading: loadingMember,
    error: errorMember,
    member,
  } = propubMemberDetails

  useEffect(() => {
    dispatch(listPropubMemberDetails(person.propubId))
    if (successUpdate) {
      dispatch({ type: PERSON_UPDATE_RESET })
      // history.push('/admin/personlist')
    } else {
      if (!person.name || person._id !== personId) {
        dispatch(listPersonDetails(personId))
      } else {
        setPropubId(person.propubId)
        setName(person.name)
        setRole(person.role)
        setImage(person.image)
        setState(person.state)
        setParty(person.party)
        setDescription(person.description)
      }
    }
  }, [dispatch, history, personId, person, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updatePerson({
        _id: personId,
        propubId,
        name,
        role,
        image,
        state,
        party,
        description,
      })
    )
  }

  const stat = member.status

  const memberId = member.results?.map((memberDetail, memberDetailIndex) => (
    <p key={memberDetailIndex}>{memberDetail.id}</p>
  ))

  const memberName = member.results?.map(
    (memberDetail) => memberDetail.first_name
  )

  return (
    <>
      <Link to='/personlist' className='btn btn-light my-3'>
        Peeps
      </Link>
      <Row>
        <Col>
          <h3>status: {stat}</h3>
          <h3>MemberId: {memberId}</h3>
          <h3>MemberName: {memberName}</h3>
        </Col>
      </Row>
      <FormContainer>
        <h1>Edit Person</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingMember && <Loader />}
        {errorMember && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='state'>
              <Form.Label>State</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter state'
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='party'>
              <Form.Label>Party</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter party'
                value={party}
                onChange={(e) => setParty(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default PersonEditScreen
