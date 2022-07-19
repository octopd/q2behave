import cors from "cors"
import 'dotenv/config'
import express from 'express'
import deviceRoutes from "./routes/deviceRoutes"
import sensorDataRoutes from "./routes/sensorDataRoutes"
import userRoutes from "./routes/userRoutes"

const corsOptions = {
  origin: ['https://q2behave.azureedge.net', 'https://q2behave.azurewebsites.net'],
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV

app.use(express.json())
app.use('/api/data', sensorDataRoutes)
app.use('/api/device', deviceRoutes)
app.use('/api/user', userRoutes)

app.use('/', (req, res) => res.send('server is running...'))

app.listen(
  PORT,
  () => console.log(
    `Server is running ${NODE_ENV} mode on port ${PORT}...`
  )
)
