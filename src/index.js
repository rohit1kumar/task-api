import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import config from './config/index.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})
