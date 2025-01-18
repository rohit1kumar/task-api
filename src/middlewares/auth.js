import { verifyToken } from '../utils/token.js'

export const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'Authentication required' })
		}

		req.user = verifyToken(token)
		next()
	} catch (error) {
		res.status(401).json({ message: 'Invalid token' })
	}
}

