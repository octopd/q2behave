import asyncHandler from 'express-async-handler'
import _ from 'lodash'
import mysql from 'mysql2'
const fs = require('fs');

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
});


// @desc    Get data
// @route   GET /api/data
// @access  Public //TODO: Make private
const getData = asyncHandler(async (req, res) => {
  // TODO: Add error handling
  // TODO: add comments...

  const { start, end } = req.params
  const a = new Date().getTime()

  let data: any = {}

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

  const deviceQuery = `SELECT DeviceName from devices`

  const sensorDataQuery =
    `SELECT *
    FROM sensordata
    WHERE UTCTics BETWEEN '${start}' AND '${end}'
    ORDER BY UTCTics DESC;`


  conn.query(deviceQuery, function (err: any, devices: any, fields: any) {
    if (err) throw err;

    //TODO: Speed up this query by choosing columns, 

    conn.query(sensorDataQuery, function (err: any, result: any, fields: any) {
      if (err) throw err;

      if (result) {
        const b = new Date().getTime()

        if (result.length) {

          for (let i = 0; i < devices.length; i++) {

            for (let j = 0; j < keys.length; j++) {
              const name = `${devices[i].DeviceName}_${keys[j]}`
              data[`${name}`] = []
            }
          }

          for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < keys.length; j++) {
              data[`${result[i].DeviceID}_${keys[j]}`].push([result[i].UTCTics, result[i][keys[j]]])
            }
          }
        }

        console.log(`Request time to finish: ${(b - a) / 1000} seconds`)

        res.status(201).json(data)

      }
    });
  });
})


// @desc    Get Devices
// @route   GET /api/data
// @access  Public //TODO: Make private
const getDevices = asyncHandler(async (req, res) => {
  //TODO: Add error handling
  const query = `SELECT DeviceName from devices`

  conn.query(query, function (err: any, result: any, fields: any) {
    if (err) throw err;

    const data = result.map((x: any) => x.DeviceName)

    if (data) {
      res.status(201).json(data)
    }
  });
})


export { getData, getDevices }
