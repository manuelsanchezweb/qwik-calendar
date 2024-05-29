import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from '../src/db/schema'
import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
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
        name: 'Manuel',
        password: 'zeitmola',
      },
      {
        id: 2,
        name: 'Finn',
        password: 'wsmola',
      },
    ])

    await db.insert(schema.appointmentsTable).values([
      {
        id: 1,
        title: 'Meeting',
        date: '2024-10-01',
        time_start: '10:00',
        time_end: '11:00',
        full_day: 0,
        category: 'work',
        created_by: 1,
      },
      {
        id: 2,
        title: 'Go to the beach',
        date: '2024-08-01',
        time_start: '',
        time_end: '',
        full_day: 1,
        category: 'leisure',
        created_by: 2,
      },
      {
        id: 3,
        title: 'Explain to my boss why am so cool',
        date: '2024-07-01',
        time_start: '09:00',
        time_end: '11:00',
        full_day: 0,
        category: 'work',
        created_by: 2,
      },
      {
        id: 4,
        title: 'Code Collabender with Finn',
        date: '2024-05-29',
        time_start: '09:00',
        time_end: '11:00',
        full_day: 0,
        category: 'work',
        created_by: 1,
      },
      {
        id: 5,
        title: 'Go with my mom to Nivea Store in Jungfernstieg',
        date: '2024-05-29',
        time_start: '18:00',
        time_end: '19:00',
        full_day: 0,
        category: 'work',
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
