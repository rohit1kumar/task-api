import jwt from 'jsonwebtoken'
import config from '../config/index.js'

export const generateToken = (payload) => {
	return jwt.sign(payload, config.JWT_SECRET, {
		expiresIn: config.JWT_EXPIRES_IN
	})
}

export const verifyToken = (token) => {
	try {
		return jwt.verify(token, config.JWT_SECRET)
	} catch (error) {
		throw new Error('Invalid token')
	}
}
