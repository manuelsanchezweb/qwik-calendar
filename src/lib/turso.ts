import type { RequestEventBase } from '@builder.io/qwik-city'
import { createClient, type Client } from '@libsql/client/web'

export function tursoClient(requestEvent: RequestEventBase): Client {
  const url = requestEvent.env.get('VITE_TURSO_CONNECTION_URL')?.trim()
  if (url === undefined) {
    throw new Error('TURSO_CONNECTION_URL is not defined')
  }

  const authToken = requestEvent.env.get('VITE_TURSO_AUTH_TOKEN')?.trim()
  if (authToken === undefined) {
    if (!url.includes('file:')) {
      throw new Error('TURSO_AUTH_TOKEN is not defined')
    }
  }

  return createClient({
    url,
    authToken,
  })
}
