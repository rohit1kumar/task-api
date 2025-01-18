import { defineConfig } from 'drizzle-kit'
import config from './src/config/index.js'

export default defineConfig({
	out: './migrations',
	schema: './src/models/*.js',
	dialect: 'postgresql',
	dbCredentials: {
		url: config.DATABASE_URL
	}
})
