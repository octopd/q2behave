import express from 'express'
import { authUser, createUser } from '../controllers/userController'

const router = express.Router()

router.route('/signin').post(authUser)
router.route('/signup').post(createUser)


export default router
