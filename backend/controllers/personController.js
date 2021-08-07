import asyncHandler from 'express-async-handler'
import Person from '../models/personModel.js'

// @desc    Fetch all persons
// @route   GET /api/persons
// @access  Public
const getPersons = asyncHandler(async (req, res) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Person.countDocuments({ ...keyword })
  const persons = await Person.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ persons, page, pages: Math.ceil(count / pageSize) })
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
// @access  Private
const createPerson = asyncHandler(async (req, res) => {
  const person = new Person({
    propubId: 'Person ProPublica ID',
    name: 'Person name',
    role: 'Person role',
    user: req.user._id,
    image: '/images/sample.jpg',
    state: 'Person state',
    party: 'Person party',
    numResearch: 0,
    description: 'Person description',
  })

  const createdPerson = await person.save()
  res.status(201).json(createdPerson)
})

// @desc    Update a person
// @route   PUT /api/persons/:id
// @access  Private
const updatePerson = asyncHandler(async (req, res) => {
  const { propubId, name, role, description, image, state, party } = req.body

  const person = await Person.findById(req.params.id)

  if (person) {
    person.propubId = propubId
    person.name = name
    person.role = role
    person.description = description
    person.image = image
    person.state = state
    person.party = party

    const updatedPerson = await person.save()
    res.json(updatedPerson)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

export { getPersons, getPersonById, deletePerson, createPerson, updatePerson }
