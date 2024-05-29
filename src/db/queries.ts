import { db } from './db'
import { eq } from 'drizzle-orm'
import { type InsertUser, type SelectUser, usersTable } from './schema'

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data)
}

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number
    name: string
    password: string
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id))
}
