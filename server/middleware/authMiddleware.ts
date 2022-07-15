import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2'

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

const JWT_SECRET = "JWT_SECRET" //FIXME: TODO: process.env.JWT_SECRET

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded: any = jwt.verify(token, JWT_SECRET)

            const query = `SELECT * FROM users WHERE UserID = '${decoded.id}' LIMIT 1`

            conn.query(query, function (err: any, results: any) {
                if (err) throw err

                if (results.length) {
                    next()
                }
                else {
                    res.status(401)
                    throw new Error('Not authorized, token failed')
                }

                return;
            })


        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const adminProtect = asyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded: any = jwt.verify(token, JWT_SECRET)

            const query = `SELECT * FROM users WHERE UserID = '${decoded.id}' LIMIT 1`

            conn.query(query, function (err: any, results: any) {
                if (err) throw err

                if (results[0].UserRole === "Administrator") {
                    next()
                }
                else {
                    res.status(401)
                    throw new Error('Not authorized, token failed')
                }

                return;
            })


        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


export { protect, adminProtect }
