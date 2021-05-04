import express from 'express'
const router = express.Router()
import { getPersons, getPersonByid } from '../controllers/personController.js'

router.route('/').get(getPersons)
router.route('/:id').get(getPersonByid)

export default router
