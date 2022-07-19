import bcrypt from 'bcryptjs'
import dayjs from 'dayjs'
import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'
import Users from '../db/models/Users'
import generateToken from '../utils/generateToken'

const NODEMAILER_USER = process.env.NODEMAILER_USER
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD
const DOMAIN = process.env.DOMAIN

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASSWORD,
    },
})

// @desc    Auth user & get token
// @route   POST /api/user/signin
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ where: { Email: email } })

    if (user) {
        const validPassword = await bcrypt.compare(password, user.EncryptedPassword)

        if (validPassword) {
            res.json({
                firstName: user.FirstName,
                lastName: user.LastName,
                email: user.Email,
                role: user.UserRole,
                token: generateToken(user.UserID.toString()),
            })

        } else {
            res.status(404).send('Incorrect user name or password')
        }
    } else {
        res.status(404).send('Incorrect user name or password')
    }
})

// @desc    Add new user
// @route   POST /api/user/signup
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, admin } = req.body

    const [user, created] = await Users.findOrCreate({
        where: {
            Email: email
        },
        defaults: {
            Email: email,
            EncryptedPassword: await bcrypt.hash(password, 10),
            FirstName: firstName,
            LastName: lastName,
            UserRole: admin
        },
    })

    if (!created) {
        res.status(404).send('User already exists')
    } else {
        res.status(201).json({ success: true })
    }
})

// @desc    Send password reset email
// @route   POST /api/user/send-reset-link
// @access  Public
const sendResetLink = asyncHandler(async (req, res) => {
    const { email } = req.body

    const user = await Users.findOne({ where: { Email: email } })

    if (user) {

        const characters =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let confirmationCode = ''

        for (let i = 0; i < 25; i++) {
            confirmationCode +=
                characters[Math.floor(Math.random() * characters.length)]
        }

        const updatedUser = await Users.update({
            PasswordKey: confirmationCode,
            PasswordDate: dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss") as unknown as Date
        }, {
            where: {
                Email: email
            }
        })

        if (updatedUser) {
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
                                <p style = "margin-bottom: 56px;"> Hello, ${user.FirstName}! We received a password reset request.Please use the link below to create a new password.The link will expire in 24 hours.</p>
                                <a style = "text-decoration:none;border-radius:2px;padding: 12px 16px;color: white;font-weight: bold;background: #005072;background-image: linear-gradient(283deg, rgba(21, 158, 190, 0.95), #005072);" href="${DOMAIN}/reset-password/${confirmationCode}"> Create a new password </a>
                                <p style = "margin-top: 160px;"> If you think you’ve received this email by mistake, please contact us at <a href="info@octopd.com">info@octopd.com</a>.</p>
                            </div>
                           </div>`,
                })
                .catch((err) => console.log(err))
        }

    } else {
        res.status(404).send('User not found')
    }
})


// @desc    Reset user password
// @route   POST /api/user/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const { password, code } = req.body

    const user = await Users.findOne({ where: { PasswordKey: code } })

    if (user) {

        const now = new Date().getTime()

        const resetDate = user.PasswordDate.getTime()

        const valid = now - resetDate < 24 * 60 * 60 * 1000

        if (!valid) {

            res.status(404).send('Confirmation code expired. Please reset your password again.')

        } else {
            const encryptedPassword = await bcrypt.hash(password, 10)

            const updatedUser = await Users.update({
                EncryptedPassword: encryptedPassword,
                PasswordDate: dayjs(new Date()).format("YYYY-MM-DD hh:mm:ss") as unknown as Date
            }, {
                where: {
                    PasswordKey: code,
                }
            })

            if (updatedUser) {
                res.status(201).json({ success: true })
            }

        }
    } else {
        res.status(404).send('Invalid confirmation code.')
    }
})

export { authUser, createUser, sendResetLink, resetPassword }

