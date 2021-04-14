const express = require('express')
const persons = require('./data/persons')

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/persons', (req, res) => {
  res.json(persons)
})

app.get('/persons/:id', (req, res) => {
  const person = persons.find((p) => p._id === req.params.id)
  res.json(person)
})

app.listen(5000, console.log('Server running on port 5000'))
