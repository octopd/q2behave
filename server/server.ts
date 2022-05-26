import 'dotenv/config'
import express from 'express'
import iotRoutes from "./routes/iotRoutes"
import cors from "cors"

const corsOptions = {
  origin: 'https://q2behave.netlify.app',
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))

const PORT = process.env.PORT || 80
const NODE_ENV = process.env.NODE_ENV

app.use(express.json())
app.use('/api', iotRoutes)
app.use('/', (req, res) => res.redirect("https://q2behave.netlify.app/"))

app.listen(
  PORT,
  () => console.log(
    `Server is running ${NODE_ENV} mode on port ${PORT}...`
  )
)
