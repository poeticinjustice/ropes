import express from 'express'
const router = express.Router()
import {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
} from '../controllers/personController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPersons).post(protect, admin, createPerson)
router
  .route('/:id')
  .get(getPersonById)
  .delete(protect, admin, deletePerson)
  .put(protect, admin, updatePerson)

export default router
