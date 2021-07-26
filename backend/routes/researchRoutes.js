import express from 'express'
const router = express.Router({ mergeParams: true })
import {
  getAllResearch,
  getResearchById,
  createResearch,
} from '../controllers/researchController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getAllResearch).post(protect, admin, createResearch)
router.route('/:id').get(getResearchById)

export default router
