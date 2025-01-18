import { Router } from 'express'
import {
	createTask,
	getTasksByUser,
	updateTaskById,
	deleteTaskById
} from '../controllers/taskController.js'
import { validateSchema } from '../middlewares/validate.js'
import { authenticate } from '../middlewares/auth.js'
import { taskSchema, updateTaskSchema } from '../utils/schema.js'

const router = Router()

router.post('/', validateSchema(taskSchema), authenticate, createTask)
router.get('/', authenticate, getTasksByUser)
router.patch(
	'/:id',
	validateSchema(updateTaskSchema),
	authenticate,
	updateTaskById
)
router.delete('/:id', authenticate, deleteTaskById)

export default router
