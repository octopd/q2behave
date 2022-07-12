import cors from "cors"
import 'dotenv/config'
import express from 'express'
import iotRoutes from "./routes/iotRoutes"
import userRoutes from "./routes/userRoutes"

const corsOptions = {
  origin: 'https://q2behavestorage.z13.web.core.windows.net',
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV

app.use(express.json())
app.use('/api/data', iotRoutes)
app.use('/api/user', userRoutes)

app.use('/', (req, res) => res.send('server is running...'))

app.listen(
  PORT,
  () => console.log(
    `Server is running ${NODE_ENV} mode on port ${PORT}...`
  )
)
