import express from 'express'
import { getData, getDevices } from '../controllers/iotController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/:start/:end').get(protect, getData)
router.route('/devices').get(protect, getDevices)

export default router
