import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET


const generateToken = (id: string) => {
    //FIXME: TODO:
    return jwt.sign({ id }, "JWT_SECRET", {
        expiresIn: "30d",
    })
}

export default generateToken
