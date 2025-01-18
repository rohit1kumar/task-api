import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'
import { validateSchema } from '../middlewares/validate.js'
import { registerSchema, loginSchema } from '../utils/schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), registerUser)
router.post('/login', validateSchema(loginSchema), loginUser)

export default router
