export const healthCheck = (req, res) => res.send('Server is up and running')
export const notFound = (req, res) => res.status(404).send('Route not found')
export const errorHandler = (err, req, res, next) => {
	console.error(err)
	res.status(500).send('Something went wrong')
}
