import express from 'express'
import { getDevices } from '../controllers/deviceController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').get(protect, getDevices)

export default router
