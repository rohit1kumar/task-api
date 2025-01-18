import dotenv from 'dotenv'
dotenv.config()

import config from './config/index.js'
import server from './app.js'

server.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})
