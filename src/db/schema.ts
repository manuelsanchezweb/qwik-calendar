import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  password: text('password').unique().notNull(),
})

export const appointmentsTable = sqliteTable('appointments', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date').notNull(),
  time_start: text('time_start').notNull(),
  time_end: text('time_end').notNull(),
  full_day: integer('full_day').notNull(),
  category: text('category').notNull(),
  created_by: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  created_at: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  //   updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertAppointment = typeof appointmentsTable.$inferInsert
export type SelectAppointment = typeof appointmentsTable.$inferSelect
