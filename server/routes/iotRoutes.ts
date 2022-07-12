import express from 'express'
import { getData, getDevices } from '../controllers/iotController'

const router = express.Router()

router.route('/:start/:end').get(getData)
router.route('/devices').get(getDevices)

export default router
