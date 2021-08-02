import express from 'express'
const router = express.Router({ mergeParams: true })
import { getpropubMemberById } from '../controllers/propubController.js'

router.route('/:id').get(getpropubMemberById)

export default router
