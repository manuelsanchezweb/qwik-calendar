import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from '../src/db/schema'
import { createClient } from '@libsql/client'
import { APP_USERS } from '../src/config'

const client = createClient({
  url: process.env.VITE_TURSO_CONNECTION_URL!,
  authToken: process.env.VITE_TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client)

const main = async () => {
  try {
    console.log('Seeding database')

    await db.delete(schema.usersTable)
    await db.delete(schema.appointmentsTable)

    await db.insert(schema.usersTable).values([
      {
        id: 1,
        name: APP_USERS[0].name,
        password: APP_USERS[0].password,
      },
      {
        id: 2,
        name: APP_USERS[1].name,
        password: APP_USERS[1].password,
      },
      // ... // Add more users here through src/config/index.ts
    ])

    await db.insert(schema.appointmentsTable).values([
      {
        id: 1,
        title: 'Meeting',
        date: '2024-10-01',
        time_start: '10:00',
        time_end: '11:00',
        full_day: 0,
        category: 'Work',
        created_by: 1,
      },
      {
        id: 2,
        title: 'Go to the beach',
        date: '2024-08-01',
        time_start: '',
        time_end: '',
        full_day: 1,
        category: 'Leisure',
        created_by: 2,
      },
      {
        id: 3,
        title: 'Start a new job',
        date: '2024-07-01',
        time_start: '09:00',
        time_end: '18:00',
        full_day: 0,
        category: 'Work',
        created_by: 1,
      },
      {
        id: 4,
        title: 'Go fix my Steuererklärung',
        date: '2024-06-20',
        time_start: '16:00',
        time_end: '18:00',
        full_day: 0,
        category: 'Work',
        created_by: 1,
      },
      {
        id: 5,
        title: 'Fix my car',
        date: '2024-05-20',
        time_start: '16:00',
        time_end: '18:00',
        full_day: 0,
        category: 'Fun',
        created_by: 1,
      },
      {
        id: 6,
        title: 'Bring the computer to Martin',
        date: '2024-06-04',
        time_start: '16:00',
        time_end: '18:00',
        full_day: 0,
        category: 'Fun',
        created_by: 1,
      },
    ])

    console.log('Seeding finished')
  } catch (error) {
    console.error(error)
    throw new Error('Failed to seed the database')
  }
}

main()
