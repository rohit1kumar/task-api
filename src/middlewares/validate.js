/**
 * Validate the request body against a zod schema
 */
export const validateSchema = (schema) => async (req, res, next) => {
	try {
		await schema.parseAsync(req.body)
		next()
	} catch (error) {
		return res.status(400).json({
			message: 'Validation failed',
			errors: error.errors
		})
	}
}
