import type { RequestHandler } from '@builder.io/qwik-city'
import { sendPushNotificationToEndpoint } from '~/utils/notifications'

export const onGet: RequestHandler = ({ json }) => {
  sendPushNotificationToEndpoint({
    title: 'Hi! You might have some appointments today!',
    message: 'Check your calendar to see what you have planned for today!',
  })

  json(200, { message: 'Hello World' })
}
