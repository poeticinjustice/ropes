import asyncHandler from 'express-async-handler'
import Person from '../models/personModel.js'
import Research from '../models/researchModel.js'

// @desc    Fetch research
// @route   GET /api/persons/:personId/research
// @route   GET /api/research/
// @access  Public

const getResearch = asyncHandler(async (req, res) => {
  if (req.params.personId) {
    const personResearch = await Research.find({ person: req.params.personId })

    return res.json(personResearch)
  } else {
    const research = await Research.find({})
    return res.json(research)
  }
})

// @desc    Fetch single research post
// @route   GET /api/research/:id
// @access  Public
const getResearchById = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id).populate({
    path: 'person',
    select: 'name description',
  })

  if (!research) {
    res.status(404)
    throw new Error(`No research found with the id of ${req.params.id}`)
  }

  res.json(research)
})

// @desc      Create research
// @route     POST /api/persons/:personId/research
// @access    Private
const createResearch = asyncHandler(async (req, res) => {
  req.body.person = req.params.personId
  req.body.user = req.user.id

  const person = await Person.findById(req.params.personId)

  if (!person) {
    res.status(404)
    throw new Error(`no person with the id of ${req.params.personId}`)
  }

  const research = await Research.create(req.body)

  res.status(201).json({
    success: true,
    data: research,
  })
})

export { getResearch, getResearchById, createResearch }
