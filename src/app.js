import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('combined'))

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/tasks', taskRoutes)

export default app
