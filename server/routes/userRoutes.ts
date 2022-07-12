import express from 'express'
import { authUser } from '../controllers/userController'

const router = express.Router()

router.route('/signin').post(authUser)

export default router
