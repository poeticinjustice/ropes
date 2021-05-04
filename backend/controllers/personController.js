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
const getPersonByid = asyncHandler(async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (person) {
    res.json(person)
  } else {
    res.status(404)
    throw new Error('Person not found')
  }
})

export { getPersons, getPersonByid }
