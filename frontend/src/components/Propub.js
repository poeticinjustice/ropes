import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listPersonDetails, updatePerson } from '../actions/personActions'
import { getPropubMemberDetails } from '../actions/propubActions'
import { PERSON_UPDATE_RESET } from '../constants/personConstants'

const Propub = ({ match }) => {
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
  const { member } = propubMemberDetails

  const memberName = member.results
    ?.map(
      (memberDetail) => `${memberDetail.first_name} ${memberDetail.last_name}`
    )
    .join()

  const memberState = member.results
    ?.map(
      (memberRoles) =>
        (memberRoles = memberRoles.roles?.map(
          (memberRole) => memberRole.state
        ))[0]
    )
    .join()

  const memberParty = member.results
    ?.map((memberDetail) => memberDetail.current_party)
    .join()

  const memberRole = member.results
    ?.map(
      (memberRoles) =>
        (memberRoles = memberRoles.roles?.map(
          (memberRole) => memberRole.title
        ))[0]
    )
    .join()

  useEffect(() => {
    dispatch(getPropubMemberDetails(person.propubId))
    if (successUpdate) {
      dispatch({ type: PERSON_UPDATE_RESET })
    } else {
      if (!person.name || person._id !== personId) {
        dispatch(listPersonDetails(personId))
      } else {
        setPropubId(person.propubId)
        setName(memberName || person.name)
        setRole(memberRole || person.role)
        setImage(person.image)
        setState(memberState || person.state)
        setParty(memberParty || person.party)
        setDescription(person.description)
      }
    }
  }, [
    dispatch,
    personId,
    person,
    memberName,
    memberRole,
    memberState,
    memberParty,
    successUpdate,
  ])

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

  const propubHandler = (e) => {
    setPropubId(e.target.value)
    setName(memberName)
    setState(memberState)
    setParty(memberParty)
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

  return (
    <>
      <Link to='/admin/personlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Form onSubmit={propubHandler}>
        <Form.Group controlId='propubId'>
          <Form.Label>Import from Pro Publica</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter ProPub ID'
            value={propubId}
            onChange={(e) => setPropubId(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Get Data
        </Button>
      </Form>
      <FormContainer>
        <h1>Edit Person</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value || memberName)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='role'>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter role'
                value={role}
                onChange={(e) => setRole(memberRole || e.target.value)}
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
                onChange={(e) => setState(e.target.value || memberState)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='party'>
              <Form.Label>Party</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter party'
                value={party}
                onChange={(e) => setParty(e.target.value || memberParty)}
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

export default Propub
