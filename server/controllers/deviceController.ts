import expressAsyncHandler from "express-async-handler"
import Devices from "../db/models/Devices"

// @desc    Get Devices
// @route   GET /api/devices
// @access  Private
const getDevices = expressAsyncHandler(async (req, res) => {
    const devices = await Devices.findAll({ attributes: ['DeviceName'] })
    const deviceNames = devices.map((x: any) => x.DeviceName)

    if (deviceNames.length) {
        res.status(201).json(deviceNames)
    } else {
        res.status(404).send('Devices not found')
    }
})

export { getDevices }
