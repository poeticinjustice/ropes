import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listResearch } from '../actions/researchActions'

const ResearchScreen = () => {
  const dispatch = useDispatch()

  const researchList = useSelector((state) => state.researchList)
  const { loading, error, allResearch } = researchList

  useEffect(() => {
    dispatch(listResearch())
  }, [dispatch])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        {console.log('test')}
        All Peeps
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {/* {allResearch} */}
            {allResearch.map((research) => (
              <tr key={research._id}>
                <td>{research.title}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ResearchScreen
