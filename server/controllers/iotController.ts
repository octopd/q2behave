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

  console.log(start, end)


  //TODO: Speed up this query by choosing columns, 
  // TODO: Is "Event Timestamp better than UTCTics?
  const query =
    `SELECT *
      FROM sensordata
      WHERE UTCTics BETWEEN '${start}' AND '${end}'
      ORDER BY UTCTics DESC;`

  conn.query(query, function (err: any, result: any, fields: any) {
    if (err) throw err;

    if (result) {

      const b = new Date().getTime()
      console.log(`Request time to finish: ${(b - a) / 1000} seconds`)


      res.status(201).json(result)
    }

  });
})


// @desc    Get Devices
// @route   GET /api/data
// @access  Public //TODO: Make private
const getDevices = asyncHandler(async (req, res) => {
  //TODO: Add error handling
  const query = `SELECT * from devices`

  conn.query(query, function (err: any, result: any, fields: any) {
    if (err) throw err;

    const data = Object.values(JSON.parse(JSON.stringify(result)));

    if (data) {
      res.status(201).json(data)
    }

  });
})



export { getData, getDevices }
