import express from 'express'
import { getSensorData } from '../controllers/sensorDataController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/:start/:end').get(protect, getSensorData)

export default router
