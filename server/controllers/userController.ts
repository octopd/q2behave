import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql2'
import generateToken from '../utils/generateToken'

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
    const { email, password } = req.body

    const query = `SELECT * FROM users WHERE Email = '${email}' LIMIT 1`
    conn.query(query, async function (err: any, result: any, fields: any) {
        if (err) throw err

        const validPassword = await bcrypt.compare(password, result[0].EncyptedPassword)

        if (validPassword) {
            res.json({
                firstName: result[0].FirstName,
                lastName: result[0].LastName,
                email: result[0].Email,
                token: generateToken(result[0].UserID),
            })

        } else {
            res.status(404).send('Incorrect user name or password')
        }
    })
})

// @desc    Add new user
// @route   POST /api/user/signup
// @access  Public
const createUser = asyncHandler(async (req, res) => {

    //TODO: Prevent multiple accounts
    const { email, password, firstName, lastName, admin } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const query = `INSERT INTO 
    users 
    (FirstName, LastName, Email, EncyptedPassword, UserRole)
    VALUES 
    ('${firstName}', '${lastName}', '${email}', '${encryptedPassword}', '${admin ? "Administrator" : "User"}')`

    conn.query(query, function (err: any, result: any, fields: any) {
        if (err) throw err

        if (result) {
            res.status(201).json(result)
        }
    })
})

export { authUser, createUser }

