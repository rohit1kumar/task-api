import statusCode from '../config/statusCode.js'
import { verifyToken } from '../utils/token.js'

/**
 * Authenticate the user by verifying the token,
 * if token is valid, set the user in the request object
 */
export const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(statusCode.UNAUTHORIZED).json({ message: 'Authentication required' })
		}

		req.user = verifyToken(token)
		next()
	} catch (error) {
		console.log(error)
		res.status(statusCode.UNAUTHORIZED).json({ message: 'Invalid token' })
	}
}
