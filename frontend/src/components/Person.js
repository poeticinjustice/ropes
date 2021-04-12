import React from 'react'
import { Card } from 'react-bootstrap'

const Person = ({ person }) => {
  return (
    <Card className='my-3 p-3 round'>
      <a href={`/person/${person._id}`}>
        <Card.Img src={person.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/person/${person._id}`}>
          <Card.Title as='div'>
            <strong>{person.name}</strong>
          </Card.Title>
        </a>

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
