import express from 'express'
const router = express.Router({ mergeParams: true })
import {
  getResearch,
  getResearchById,
  createResearch,
} from '../controllers/researchController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getResearch).post(protect, createResearch)
router.route('/:id').get(getResearchById)

export default router
