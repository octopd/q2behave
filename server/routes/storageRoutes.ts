import express from 'express'
import { getDirectories } from '../controllers/storageController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/directories').get(protect, getDirectories)

export default router
