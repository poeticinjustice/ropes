import asyncHandler from 'express-async-handler'
import Person from '../models/personModel.js'

// @desc    Fetch all persons
// @route   GET /api/persons
// @access  Public
const getPersons = asyncHandler(async (req, res) => {
  const persons = await Person.find({})

  res.json(persons)
})

// @desc    Fetch single person
// @route   GET /api/persons/:id
// @access  Public
const getPersonById = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (person) {
    res.json(person)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

// @desc    Delete a person
// @route   DELETE /api/persons/:id
// @access  Private/Admin
const deletePerson = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (person) {
    await person.remove()
    res.json({ message: 'Person removed' })
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

// @desc    Create a person
// @route   POST /api/persons
// @access  Private/Admin
const createPerson = asyncHandler(async (req, res) => {
  const person = new Person({
    name: 'Sample name',
    role: 'example role',
    user: req.user._id,
    image: '/images/sample.jpg',
    state: 'Sample state',
    party: 'Sample party',
    numReviews: 0,
    description: 'Sample description',
  })

  const createdPerson = await person.save()
  res.status(201).json(createdPerson)
})

// @desc    Update a person
// @route   PUT /api/persons/:id
// @access  Private/Admin
const updatePerson = asyncHandler(async (req, res) => {
  const { name, role, description, image, state, party, countInStock } =
    req.body

  const person = await Person.findById(req.params.id)

  if (person) {
    person.name = name
    person.role = role
    person.description = description
    person.image = image
    person.state = state
    person.party = party
    person.countInStock = countInStock

    const updatedPerson = await person.save()
    res.json(updatedPerson)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

export { getPersons, getPersonById, deletePerson, createPerson, updatePerson }
