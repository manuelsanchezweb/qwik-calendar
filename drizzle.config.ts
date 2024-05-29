import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',

  dbCredentials: {
    url: process.env.VITE_TURSO_CONNECTION_URL!,
    authToken: process.env.VITE_TURSO_AUTH_TOKEN!,
  },
})
