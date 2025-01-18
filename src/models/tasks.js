import {
	pgTable,
	pgEnum,
	uuid,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'
import { users } from './users'

export const statusEnums = pgEnum('status', [
	'pending',
	'in_progress',
	'completed'
])

export const tasks = pgTable('tasks', {
	id: uuid().primaryKey().defaultRandom(),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	status: statusEnums().default('pending').notNull(), // pending, in_progress, completed
	userId: uuid('user_id')
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
})
