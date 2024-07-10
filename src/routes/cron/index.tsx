import { component$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

export const onRequest: RequestHandler = ({
  headers,
  query,
  json,
  request,
}) => {
  console.log('This is the request:', request)
  headers.set('Cache-Control', 'private')
  if (query.get('format') === 'json') {
    json(200, { message: 'Hello World' })
  }
}
