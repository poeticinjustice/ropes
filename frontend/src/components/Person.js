import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Person = ({ person }) => {
  return (
    <Card className='my-3 p-3 round'>
      <Link to={`/person/${person._id}`}>
        <Card.Img
          src={`https://theunitedstates.io/images/congress/225x275/${person.propub_id}.jpg`}
          onError={(e) => {
            e.target.onerror = null
            e.target.src =
              'https://ropesapp.herokuapp.com/uploads/image-1628982927716.png'
          }}
          variant='top'
        />
      </Link>
      <Card.Body>
        <Link to={`/person/${person._id}`}>
          <Card.Title as='div'>
            <strong>{person.first_name + ' ' + person.last_name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div>{person.role}</div>
          <div className='my-3'>
            {person.party} from {person.state}
          </div>
        </Card.Text>

        <Card.Text as='div'>
          <div>{person.role}</div>
          <div className='my-3'>{person.title}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Person
