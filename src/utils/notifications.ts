export const sendPushNotificationToEndpoint = async ({
  title,
  message,
}: {
  title: string
  message: string
}) => {
  const response = await fetch(
    'https://qwik-calendar.vercel.app/notifications',
    {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        message: message,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    console.error('Failed to send push notification:', error)
  }
}
