import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'
import asyncHandler from 'express-async-handler'
import mysql from 'mysql2'
import nodemailer from 'nodemailer'
import generateToken from '../utils/generateToken'

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const NODEMAILER_USER = process.env.NODEMAILER_USER
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD
const DOMAIN = process.env.DOMAIN

const conn = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: 3306,
    ssl: {}
})

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "info@octopd.com",
        pass: "Main$T706",
    },
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
            const user = result[0]

            res.json({
                firstName: user.FirstName,
                lastName: user.LastName,
                email: user.Email,
                role: user.UserRole,
                token: generateToken(result[0].UserID),
            })

        } else {
            res.status(404).send('Incorrect user name or password')
        }
    })
})

// @desc    Add new user
// @route   POST /api/user/signup
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, admin } = req.body

    const userExistsQuery = `SELECT * FROM users WHERE Email = '${email}' LIMIT 1`
    conn.query(userExistsQuery, async function (err: any, result: any, fields: any) {
        if (err) throw err

        if (result.length) {
            res.status(404).send('User already exists')
        } else {
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
        }
    })
})

// @desc    Send password reset email
// @route   POST /api/user/send-reset-link
// @access  Public
const sendResetLink = asyncHandler(async (req, res) => {
    const { email } = req.body

    console.log("USER: ", NODEMAILER_USER)
    console.log("pass: ", NODEMAILER_PASSWORD)

    const userQuery = `SELECT * FROM users WHERE Email = '${email}' LIMIT 1`

    conn.query(userQuery, async function (err: any, result: any, fields: any) {
        if (err) throw err

        if (result.length) {

            const user = result[0]
            const characters =
                '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            let confirmationCode = ''

            for (let i = 0; i < 25; i++) {
                confirmationCode +=
                    characters[Math.floor(Math.random() * characters.length)]
            }

            const updateQuery = `UPDATE users
            SET PasswordKey = '${confirmationCode}', PasswordDate = ' ${dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss")} '
            WHERE Email = '${email}'; `

            conn.query(updateQuery, async function (err: any, result: any, fields: any) {
                if (err) throw err

                res.json({
                    success: true,
                })

                transport
                    .sendMail({
                        from: NODEMAILER_USER,
                        to: email.toLowerCase(),
                        subject: 'Reset your password',
                        html: `<div style = "padding: 32px; max-width: 560px; " >
                <div style="width: 80px;height: 3px; background: #018bb0;background-image: linear-gradient(283deg, rgba(1, 139, 176, 1) 0%, rgba(100, 179, 139, 1) 76%,rgba(178, 210, 111, 1) 100%);" > </div>
                    <h1 style = "font-size: 24px;font-weight: bold;margin-top: 24px;margin-bottom: 48px;" > Reset your password </h1>
                        <p style = "margin-bottom: 56px;" > Hello, ${user.FirstName}! We received a password reset request.Please use the link below to create a new password.The link will expire in 24 hours.</p>
                            <a style = "text-decoration:none;border-radius:2px;padding: 12px 16px;color: white;font-weight: bold;background: #005072;background-image: linear-gradient(283deg, rgba(21, 158, 190, 0.95), #005072);" href="https://q2behave.azureedge.net/reset-password/${confirmationCode}" > Create a new password </a>
                                <p style = "margin-top: 160px;" > If you think you’ve received this email by mistake, please contact us at < a href = "info@octopd.com" > info@octopd.com</a>.</p>
                                    </div>
                                    </div>`,
                    })
                    .catch((err) => console.log(err))

            })

        } else {
            res.status(404).send('User not found')
        }
    })

})


// @desc    Reset user password
// @route   POST /api/user/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { password, code } = req.body

    const userQuery = `SELECT * FROM users WHERE PasswordKey = '${code}' LIMIT 1`
    conn.query(userQuery, async function (err: any, result: any, fields: any) {
        if (err) throw err


        if (result.length) {

            const now = new Date().getTime()

            const resetDate = result[0].PasswordDate.getTime()

            const valid = now - resetDate < 24 * 60 * 60 * 1000

            if (!valid) {

                res.status(404).send('Confirmation code expired. Please reset your password again.')

            } else {
                const encryptedPassword = await bcrypt.hash(password, 10)

                const updateQuery = `UPDATE users
            SET EncyptedPassword = '${encryptedPassword}', PasswordKey = ''
            WHERE PasswordKey = '${code}'; `

                //TODO: Have Carl fix spelling of EncyptedPassword

                conn.query(updateQuery, function (err: any, result: any, fields: any) {
                    if (err) throw err

                    if (result) {
                        res.status(201).json({ success: true })
                    }
                })
            }
        } else {
            res.status(404).send('Invalid confirmation code.')

        }
    })
})

export { authUser, createUser, sendResetLink, resetPassword }

