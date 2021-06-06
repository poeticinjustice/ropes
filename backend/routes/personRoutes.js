import express from 'express'
const router = express.Router()
import {
  getPersons,
  getPersonById,
  deletePerson,
} from '../controllers/personController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPersons)
router.route('/:id').get(getPersonById).delete(protect, admin, deletePerson)

export default router
