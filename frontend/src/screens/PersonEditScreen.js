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

const PersonEditScreen = ({ match }) => {
  const personId = match.params.id
  const [propub_id, setPropub_id] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [title, setTitle] = useState('')
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
    // loading: loadingMember,
    // error: errorMember,
    member,
  } = propubMemberDetails

  const propubNum = (e) =>
    setPropub_id(e.target.value.split('members/').pop().split('-')[0])

  const memberImage = `https://theunitedstates.io/images/congress/225x275/${person.propub_id}.jpg`

  const memberFirstName = member.results
    ?.map((memberDetail) => memberDetail.first_name)
    .join()

  const memberLastName = member.results
    ?.map((memberDetail) => memberDetail.last_name)
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

  const memberTitle = member.results
    ?.map(
      (memberRoles) =>
        (memberRoles = memberRoles.roles?.map(
          (memberRole) => memberRole.title
        ))[0]
    )
    .join()

  useEffect(() => {
    dispatch(getPropubMemberDetails(person.propub_id))
    if (successUpdate) {
      dispatch({ type: PERSON_UPDATE_RESET })
    } else {
      if (person._id !== personId) {
        dispatch(listPersonDetails(personId))
      } else {
        setPropub_id(person.propub_id)
        setFirstName(memberFirstName || person.first_name)
        setLastName(memberLastName || person.last_name)
        setTitle(memberTitle || person.title)
        setImage(memberImage || person.image)
        setState(memberState || person.state)
        setParty(memberParty || person.party)
        setDescription(person.description)
      }
    }
  }, [
    dispatch,
    personId,
    person,
    memberFirstName,
    memberLastName,
    memberTitle,
    memberImage,
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
    setPropub_id(e.target.value)
    setFirstName(memberFirstName)
    setLastName(memberLastName)

    setState(memberState)
    setParty(memberParty)
    e.preventDefault()
    dispatch(
      updatePerson({
        _id: personId,
        propub_id,
        first_name,
        last_name,
        title,
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
        propub_id,
        first_name,
        last_name,
        title,
        image,
        state,
        party,
        description,
      })
    )
  }

  return (
    <>
      <Link to={`/person/${person._id}`}>
        <Button className='btn btn-light my-3'>{`${first_name} ${last_name}`}</Button>
      </Link>

      <Form onSubmit={propubHandler}>
        <Form.Group controlId='propub_id'>
          <Form.Label>
            Import from Pro Publica by pasting the link of a{' '}
            <a
              href='https://projects.propublica.org/represent/members/117/senate'
              target='_blank'
              rel='noreferrer noopener'
            >
              {' '}
              Senator
            </a>{' '}
            or{' '}
            <a
              href='https://projects.propublica.org/represent/members/117/house'
              target='_blank'
              rel='noreferrer noopener'
            >
              {' '}
              House Member{' '}
            </a>
            , and click update below.
          </Form.Label>
          <Form.Control
            className='propubform'
            title='Paste a congress member link from ProPublica'
            type='text'
            placeholder='Enter ProPublica ID'
            value={propub_id}
            onChange={propubNum}
            pattern='[a-zA-Z0-9]{7}$'
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Get Data
        </Button>
      </Form>
      {successUpdate && (
        <Message variant='success'>Research posted successfully</Message>
      )}
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
            <Form.Group controlId='first_name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter first name'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='last_name'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='title'>
              <Form.Label>title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(memberImage || e.target.value)}
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
