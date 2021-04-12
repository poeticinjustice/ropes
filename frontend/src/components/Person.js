import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Person = ({ person }) => {
  return (
    <Card className='my-3 p-3 round'>
      <Link to={`/person/${person._id}`}>
        <Card.Img src={person.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/person/${person._id}`}>
          <Card.Title as='div'>
            <strong>{person.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <div className='my-3'>
            {person.party} from {person.state}
          </div>
        </Card.Text>
        <Card.Text as='h3'>
          <div className='my-3'>Ropes: {person.posts}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Person
