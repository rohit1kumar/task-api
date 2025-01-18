import TaskTable from '../models/tasks.js'
import db from '../config/database.js'
import { eq } from 'drizzle-orm'

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

export const getTasksByUser = async (req, res) => {
	const { id: userId } = req.user
	// TODO: add pagination
	const tasks = await db
		.select()
		.from(TaskTable)
		.where(eq(TaskTable.userId, userId))
	return res.status(200).json({
		message: 'Tasks fetched successfully',
		data: tasks
	})
}

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

	// delete task
	await db.delete(TaskTable).where(eq(TaskTable.id, id))

	return res
		.status(200)
		.json({ message: 'Task deleted successfully', data: null })
}
