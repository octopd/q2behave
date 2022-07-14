import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql2'
import generateToken from '../utils/generateToken'

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

// @desc    Auth user & get token
// @route   POST /api/user/signin
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { userName, password } = req.body


    if (userName === "admin" && password === "password") {

        res.json({
            _id: "id",
            firstName: "Octo",
            lastName: "PD",
            email: "info@octopd.com",
            token: generateToken("id"),
        })

    } else {
        res.status(404).send('Incorrect user name or password')
        throw new Error('Incorrect user name or password')
    }
})

// @desc    Add new user
// @route   POST /api/user/signup
// @access  Public
const createUser = asyncHandler(async (req, res) => {

    const { email, password, firstName, lastName, admin } = req.body


    console.log(admin)
    const encryptedPassword = await bcrypt.hash(password, 10)

    const query = `INSERT INTO 
    users 
    (FirstName, LastName, Email, EncyptedPassword, UserRole)
    VALUES 
    ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}', '${admin ? "Administrator" : "User"}')`

    conn.query(query, function (err: any, result: any, fields: any) {
        if (err) throw err

        console.log(result)

        if (result) {
            res.status(201).json(result)
        }
    })
})

export { authUser, createUser }

