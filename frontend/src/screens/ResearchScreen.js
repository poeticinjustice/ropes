import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Image, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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
      <Link className='btn btn-light my-3' to='/research'>
        All Research
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table>
            <tr>
              <td className='d-none d-md-block'>
                Name: {research?.person?.name}
              </td>
              <td className='d-none d-md-block'>Title: {research.title}</td>
              <td className='d-none d-md-block'>
                Description: {research.description}
              </td>
              <Image src={research.image} alt={research.title} fluid />
              <td className='d-none d-md-block'>Link: {research.link}</td>
              <td className='d-none d-md-block'>
                Posted By: {research.user?.name}
              </td>
              <td className='d-none d-md-block'>
                <p>Date Posted: {research.createdAt?.substring(0, 10)}d</p>
              </td>
            </tr>{' '}
          </Table>
          <LinkContainer to={`/person/${research?.person?._id}`}>
            <Button variant='dark'>Person</Button>
          </LinkContainer>
          <LinkContainer to={`/research/${research._id}/edit`}>
            <Button variant='dark'>Edit</Button>
          </LinkContainer>
        </>
      )}
    </>
  )
}

export default ResearchScreen
