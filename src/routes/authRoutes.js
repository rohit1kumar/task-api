import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { validate } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../utils/schema.js'

const router = Router()

router.post('/register', validate(registerSchema), registerUser)
router.post('/login', validate(loginSchema), loginUser)

export default router
