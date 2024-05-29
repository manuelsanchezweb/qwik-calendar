import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'

const client = createClient({
  url: import.meta.env.VITE_TURSO_CONNECTION_URL!,
  authToken: import.meta.env.VITE_TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client)
