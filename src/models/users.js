import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: varchar('password', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').defaultNow()
})
