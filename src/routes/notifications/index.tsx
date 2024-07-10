export const onPost = async ({
  json,
  request,
}: {
  json: any
  request: any
}) => {
  const body = await request.json()

  const apiKey = import.meta.env.VITE_API_KEY_PUSH

  const payload = new URLSearchParams({
    title: body.title,
    message: body.message,
    url: 'https://qwik-calendar.vercel.app/',
    icon: 'https://qwik-calendar.vercel.app/logo.png',
  })

  const response = await fetch('https://api.pushalert.co/rest/v1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `api_key=${apiKey}`,
    },
    body: payload.toString(),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('Failed to send push notification:', error)
    return {
      success: false,
      error,
    }
  }

  await response.json()

  json(200, { hello: 'world' })
}
