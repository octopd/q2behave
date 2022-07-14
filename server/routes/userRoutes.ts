import express from 'express'
import { authUser, createUser, resetPassword, sendResetLink } from '../controllers/userController'

const router = express.Router()

router.route('/signin').post(authUser)
router.route('/signup').post(createUser)
router.route('/send-reset-link').post(sendResetLink)
router.route('/reset-password').post(resetPassword)


export default router
