import TaskTable from '../models/tasks.js'
import db from '../config/database.js'
import { eq } from 'drizzle-orm'
import { paginationSchema } from '../utils/schema.js'

/**
 * Create a new task for the user, returns the created task
 */
export const createTask = async (req, res) => {
	const { title, description } = req.body
	const { id: userId } = req.user

	const [task] = await db
		.insert(TaskTable)
		.values({ title, description, userId })
		.returning()
	return res.status(201).json({
		message: 'Task created successfully',
		data: task
	})
}

/**
 * Get all tasks for the logged in user
 * with optional filtering by status and pagination with page and pageSize
 * page - optional, defaults to 1
 * pageSize - optional, defaults to 10
 * status - optional (enum: 'pending', 'in-progress', 'completed')
 */
export const getTasksByUser = async (req, res) => {
	const { id: userId } = req.user

	const { status, page, pageSize } = paginationSchema.parse(req.query)

	const offset = (page - 1) * pageSize

	// Build the query with optional filtering by status
	let query = db
		.select()
		.from(TaskTable)
		.where(eq(TaskTable.userId, userId))
		.limit(pageSize)
		.offset(offset)

	if (status) {
		query = query.where(eq(TaskTable.status, status))
	}

	const tasks = await query

	return res.status(200).json({
		message: 'Tasks fetched successfully',
		data: tasks,
		meta: {
			page,
			pageSize
		}
	})
}

/**
 * Update a task by id for the logged in user, check if task belongs to user
 */
export const updateTaskById = async (req, res) => {
	const { id } = req.params
	const { title, description, status } = req.body

	const [task] = await db.select().from(TaskTable).where(eq(TaskTable.id, id))
	if (!task) {
		return res.status(404).json({ message: 'Task not found' })
	}

	// check if task belong to user
	const { id: userId } = req.user
	if (task.userId !== userId) {
		return res
			.status(403)
			.json({ message: 'Forbidden, Only the owner can perform this action' })
	}

	const [updateTask] = await db
		.update(TaskTable)
		.set({ title, description, status })
		.where(eq(TaskTable.id, id))
		.returning()
	return res.status(200).json({
		message: 'Task updated successfully',
		data: updateTask
	})
}

/**
 * Delete a task by id for the logged in user, check if task belongs to user
 */
export const deleteTaskById = async (req, res) => {
	const { id } = req.params
	const [task] = await db.select().from(TaskTable).where(eq(TaskTable.id, id))
	if (!task) {
		return res.status(404).json({ message: 'Task not found' })
	}

	// check if task belong to user
	const { id: userId } = req.user
	if (task.userId !== userId) {
		return res
			.status(403)
			.json({ message: 'Forbidden, Only the owner can perform this action' })
	}

	await db.delete(TaskTable).where(eq(TaskTable.id, id))

	return res
		.status(200)
		.json({ message: 'Task deleted successfully', data: null })
}
