import { db } from './db'
import { eq } from 'drizzle-orm'
import {
  type InsertUser,
  type SelectUser,
  usersTable,
  type InsertAppointment,
  appointmentsTable,
} from './schema'

// User queries

/**
 * Create a new user
 * @param data The user data
 */
export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

/**
 * Get a user by its ID
 * @param id The user ID
 */
export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number
    name: string
    password: string
  }>
> {
  return await db.select().from(usersTable).where(eq(usersTable.id, id))
}

/**
 * Get a user by its name
 * @param name The user name
 */
export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id))
}

// Appointment queries

/**
 * Create a new appointment
 * @param data The appointment data
 */
export async function createAppointment(data: InsertAppointment) {
  await db.insert(appointmentsTable).values(data)
}

/**
 * Delete an appointment by its ID
 */
export async function deleteAppointment(id: number) {
  await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id))
}
