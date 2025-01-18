import { drizzle } from 'drizzle-orm/node-postgres'
import config from './index.js'

export default drizzle(config.DATABASE_URL)
