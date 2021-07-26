import express from 'express'
const router = express.Router({ mergeParams: true })
import {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
} from '../controllers/personController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// Include research router
import researchRouter from './researchRoutes.js'

// Re-route into research router
router.use('/:personId/research', researchRouter)

router.route('/').get(getPersons).post(protect, admin, createPerson)
router
  .route('/:id')
  .get(getPersonById)
  .delete(protect, admin, deletePerson)
  .put(protect, admin, updatePerson)

export default router
