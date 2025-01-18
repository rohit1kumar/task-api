import statusCode from '../config/statusCode.js'

export const errorHandler = (err, req, res, next) => {
	console.log(err)
	return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
		message: 'An unexpected error occurred. Please try again later.'
	})
}
