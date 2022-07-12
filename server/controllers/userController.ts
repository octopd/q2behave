import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken'

// @desc    Auth user & get token
// @route   POST /api/users/login
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


export { authUser }

