import asyncHandler from 'express-async-handler'
import _ from 'lodash'
import mysql from 'mysql2'
const fs = require('fs')

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const conn = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: 3306,
  ssl: {}
})


// @desc    Get data
// @route   GET /api/data
// @access  Private
const getData = asyncHandler(async (req, res) => {
  // TODO: Add error handling
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
  ]

  const sensorDataQuery =
    `SELECT *
    FROM sensordata
    WHERE UTCTics BETWEEN '${start}' AND '${end}'
    ORDER BY UTCTics DESC;`


  //TODO: Speed up this query by choosing columns that Oana is interested in

  conn.query(sensorDataQuery, function (err: any, result: any, fields: any) {
    if (err) throw err;

    if (result) {
      const b = new Date().getTime()

      if (result.length) {
        for (let i = 0; i < devices.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            const name = `${devices[i]}-${keys[j]}`
            data[`${name}`] = []
            dataSets.push(name)
          }
        }

        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < keys.length; j++) {
            data[`${result[i].DeviceID}-${keys[j]}`].push({ x: result[i].UTCTics, y: result[i][keys[j]] })
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

      console.log(`Request time to finish: ${(b - a) / 1000} seconds`)

      res.status(201).json(formattedData)
    }
  })
})


// @desc    Get Devices
// @route   GET /api/data
// @access  Private
const getDevices = asyncHandler(async (req, res) => {
  //TODO: Add error handling
  const query = `SELECT DeviceName from devices`

  conn.query(query, function (err: any, result: any, fields: any) {
    if (err) throw err

    const data = result.map((x: any) => x.DeviceName)

    if (data) {
      res.status(201).json(data)
    }
  })
})


export { getData, getDevices }
