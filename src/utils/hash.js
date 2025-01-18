import bcrypt from 'bcrypt'
import config from '../config/index.js'

export const hashPassowrd = async (password) =>
	bcrypt.hash(password, config.PASSWORD_HASH_SALT_ROUND)

export const comparePassword = (password, hashedPassword) =>
	bcrypt.compare(password, hashedPassword)
