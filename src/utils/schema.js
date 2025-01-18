import { z } from 'zod'
import { statusEnums } from '../models/tasks.js'
import config from '../config/index.js'
/**
 * User schema
 */
export const registerSchema = z.object({
	email: z.string().email('Invalid email format'),
	password: z.string().min(6, 'Password must be at least 6 characters')
})

export const loginSchema = registerSchema

/**
 * Task schema
 */
export const taskSchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	description: z
		.string()
		.min(10, 'Description must be at least 10 characters')
		.optional(),
	status: z.enum(statusEnums.enumValues).optional()
})

// partial() allows for partial updates and makes all fields optional
export const updateTaskSchema = taskSchema.partial()

/**
 * Pagination schema for query parameters in URL
 */
export const paginationSchema = z.object({
	status: z
		.string()
		.optional()
		.transform(
			(val) => (statusEnums.enumValues.includes(val) ? val : undefined) // Validate status
		),
	page: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : 1)), // convert string to number
	pageSize: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val, 10) : config.PAGINATION_PAGE_SIZE)) // convert string to number
})
