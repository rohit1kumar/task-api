import { z } from 'zod'
import { statusEnums } from '../models/tasks.js'

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
