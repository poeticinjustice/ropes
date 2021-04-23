import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Person from '../models/personModel.js'

// @desc    Fetch all persons
// @route   GET /api/persons
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const persons = await Person.find({})

    res.json(persons)
  })
)

// @desc    Fetch single person
// @route   GET /api/persons/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const person = await Person.findById(req.params.id)

    if (person) {
      res.json(person)
    } else {
      res.status(404)
      throw new Error('Person not found')
    }
  })
)

export default router
