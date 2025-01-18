import usersTable from '../models/users.js'
import db from '../config/database.js'
import utils from '../utils/index.js'
import { eq } from 'drizzle-orm'
import statusCode from '../config/statusCode.js'

/**
 * Register a new user with unique email and password returns a token
 */
export const registerUser = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1)

		if (user) {
			return res
				.status(statusCode.CONFLICT)
				.json({ message: 'User with this email already exists' })
		}

		const hashedPassword = await utils.hashPassowrd(password)
		const [newUser] = await db
			.insert(usersTable)
			.values({ email, password: hashedPassword })
			.returning()
		const token = utils.generateToken({ id: newUser.id })
		return res.status(statusCode.CREATED).json({
			message: 'User registered successfully',
			data: {
				token,
				user: newUser.id
			}
		})
	} catch (error) {
		next(error)
	}
}

/**
 *	Log in a user with email and password returns a token
 */
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const [existingUser] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1)

		if (!existingUser) {
			return res
				.status(statusCode.UNAUTHORIZED)
				.json({ message: 'Invalid credentials' })
		}

		const isValidPassword = await utils.comparePassword(
			password,
			existingUser.password
		)

		if (!isValidPassword) {
			return res
				.status(statusCode.UNAUTHORIZED)
				.json({ message: 'Invalid credentials' })
		}

		const token = utils.generateToken({ id: existingUser.id })
		return res.status(statusCode.OK).json({
			message: 'User logged in successfully',
			data: {
				token,
				user: existingUser.id
			}
		})
	} catch (error) {
		next(error)
	}
}
