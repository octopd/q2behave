import asyncHandler from 'express-async-handler';
import { Op } from "sequelize";
import SensorData from '../db/models/SensorData';


// @desc    Get data
// @route   GET /api/data
// @access  Private
const getSensorData = asyncHandler(async (req, res) => {
  // TODO: add comments...

  const { start, end } = req.params
  const a = new Date().getTime()

  let data: any = {}

  let dataSets: string[] = []

  const keys = [
    'Accel_X',
    'Accel_Y',
    'Accel_Z',
    'AudioLevel',
    'Gyro_X',
    'Gyro_Y',
    'Gyro_Z',
    'HeartRate',
    'Magno_X',
    'Magno_Y',
    'Magno_Z',
  ]

  const devices = [
    'SSW4WearOS01',
    'SSW4WearOS02',
    'SSW4WearOS03',
    'SSW4WearOS04',
    'SSW4WearOS05',
    'SSW4WearOS06',
    'SSW4WearOS07',
    'SSW4WearOS08',
    'SSW4WearOS09',
    'SSW4WearOS10',
  ]

  //TODO: Speed up this query by choosing columns that Oana is interested in


  const sensorData = await SensorData.findAll({
    where: {
      'UTCTics': { [Op.between]: [start, end] }
    },
    order: [['UTCTics', 'DESC']]
  })


  if (sensorData) {

    if (sensorData.length) {
      for (let i = 0; i < devices.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          const name = `${devices[i]}-${keys[j]}`
          data[`${name}`] = []
          dataSets.push(name)
        }
      }

      for (let i = 0; i < sensorData.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          data[`${sensorData[i].DeviceID}-${keys[j]}`].push({
            x: sensorData[i].UTCTics,
            // @ts-ignore:next-line
            y: sensorData[i][keys[j]]
          })
        }
      }
    }

    const formattedData = dataSets.map((dataSet: string, index: number) => {
      return {
        name: dataSet.split("-")[1],
        dataPoints: data[dataSet],
        deviceID: dataSet.split("-")[0]
      }
    })

    const b = new Date().getTime()

    console.log(`Request time to finish: ${(b - a) / 1000} seconds`)

    res.status(201).json(formattedData)
  }
})


export { getSensorData };

