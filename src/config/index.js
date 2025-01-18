import dotenv from 'dotenv'
dotenv.config()

export default {
	DATABASE_URL: process.env.DATABASE_URL,
	PORT: process.env.PORT || 8000,
	PASSWORD_HASH_SALT_ROUND: process.env.PASSWORD_HASH_SALT_ROUND || 10,
	JWT_SECRET: process.env.JWT_SECRET || 'top-secret',
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d'
}
