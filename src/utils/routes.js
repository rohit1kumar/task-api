import statusCode from '../config/statusCode.js'

export const healthCheck = (req, res) =>
	res.status(statusCode.OK).send('Server is up and running')
export const notFound = (req, res) =>
	res.status(statusCode.NOT_FOUND).send('Route not found')
