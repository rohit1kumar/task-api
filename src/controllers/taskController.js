import taskTable from '../models/tasks.js'
import db from '../config/database.js'
import { eq } from 'drizzle-orm'
import { paginationSchema } from '../utils/schema.js'
import statusCode from '../config/statusCode.js'

/**
 * Create a new task for the user, returns the created task
 */
export const createTask = async (req, res, next) => {
	try {
		const { title, description } = req.body
		const { id: userId } = req.user

		const [task] = await db
			.insert(taskTable)
			.values({ title, description, userId })
			.returning()
		return res.status(statusCode.CREATED).json({
			message: 'Task created successfully',
			data: task
		})
	} catch (error) {
		next(error)
	}
}

/**
 * Get all tasks for the logged in user
 * with optional filtering by status and pagination with page and pageSize
 * page - optional, defaults to 1
 * pageSize - optional, defaults to 10
 * status - optional (enum: 'pending', 'in-progress', 'completed')
 */
export const getTasksByUser = async (req, res, next) => {
	try {
		const { id: userId } = req.user

		const { status, page, pageSize } = paginationSchema.parse(req.query)

		const offset = (page - 1) * pageSize

		// Build the query with optional filtering by status
		let query = db
			.select()
			.from(taskTable)
			.where(eq(taskTable.userId, userId))
			.limit(pageSize)
			.offset(offset)

		if (status) {
			query = query.where(eq(taskTable.status, status))
		}

		const tasks = await query

		return res.status(statusCode.OK).json({
			message: 'Tasks fetched successfully',
			data: tasks,
			meta: {
				page,
				pageSize
			}
		})
	} catch (error) {
		next(error)
	}
}

/**
 * Update a task by id for the logged in user, check if task belongs to user
 */
export const updateTaskById = async (req, res, next) => {
	try {
		const { id } = req.params
		const { title, description, status } = req.body

		const [task] = await db.select().from(taskTable).where(eq(taskTable.id, id))
		if (!task) {
			return res
				.status(statusCode.NOT_FOUND)
				.json({ message: 'Task not found' })
		}

		// check if task belong to user
		const { id: userId } = req.user
		if (task.userId !== userId) {
			return res
				.status(statusCode.FORBIDDEN)
				.json({ message: 'Only the owner can perform this action' })
		}

		await db
			.update(taskTable)
			.set({ title, description, status })
			.where(eq(taskTable.id, id))

		return res.status(statusCode.OK).json({
			message: 'Task updated successfully'
		})
	} catch (error) {
		next(error)
	}
}

/**
 * Delete a task by id for the logged in user, check if task belongs to user
 */
export const deleteTaskById = async (req, res, next) => {
	try {
		const { id } = req.params
		const [task] = await db.select().from(taskTable).where(eq(taskTable.id, id))
		if (!task) {
			return res
				.status(statusCode.NOT_FOUND)
				.json({ message: 'Task not found' })
		}

		// check if task belong to user
		const { id: userId } = req.user
		if (task.userId !== userId) {
			return res
				.status(statusCode.FORBIDDEN)
				.json({ message: 'Forbidden, Only the owner can perform this action' })
		}

		await db.delete(taskTable).where(eq(taskTable.id, id))

		return res
			.status(statusCode.OK)
			.json({ message: 'Task deleted successfully' })
	} catch (error) {
		next(error)
	}
}
