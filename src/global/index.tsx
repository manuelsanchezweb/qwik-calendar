import { globalAction$ } from '@builder.io/qwik-city'
import { APP_USERS } from '~/config'

import {
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from '~/db/queries'
import { type IUser } from '~/types/types'
import { getIdByAuthorName, getListAvailablePasswords } from '~/utils/functions'

/**
 * Action to submit the password and check if it is correct
 */
export const useSubmitPassword = globalAction$(async (data, { cookie }) => {
  const password = data['password'] as string
  const availablePasswords = getListAvailablePasswords(APP_USERS)

  if (availablePasswords.includes(password)) {
    const authorizedUser = APP_USERS.find(
      (user) => user.password === password
    ) as IUser

    cookie.set('collabender-rules', '1', {
      secure: true,
      path: '/',
    })
    cookie.set('collabender-user', authorizedUser.name, {
      secure: true,
      path: '/',
    })
  } else {
    cookie.set('collabender-rules', '0', {
      secure: true,
      path: '/',
    })

    return {
      success: false,
      message: 'You sure that is your password? Try again',
    }
  }

  return {
    success: true,
  }
})

/**
 * Action to add an appointment
 */
export const useAddAppointment = globalAction$(async (data, { cookie }) => {
  const isFullDay = data['full_day'] === 'on' ? 1 : 0

  const authorName = cookie.get('collabender-user')?.value
  const authorId = getIdByAuthorName(authorName as string, APP_USERS)

  // TODO: Add validation for the date and time with zod
  const appointment = {
    title: data['title'] as string,
    date: data['date'] as string,
    time_start: data['time_start'] as string,
    time_end: data['time_end'] as string,
    full_day: isFullDay,
    category: data['category'] as string,
    created_by: authorId,
    visibility: data['visibility'] as string,
  }

  await createAppointment(appointment)

  return {
    success: true,
  }
})

/**
 * Action to add an appointment
 */
export const useEditAppointment = globalAction$(async (data, { cookie }) => {
  const isFullDay = data['full_day'] === 'on' ? 1 : 0

  const authorName = cookie.get('collabender-user')?.value
  const authorId = getIdByAuthorName(authorName as string, APP_USERS)

  // TODO: Add validation for the date and time with zod
  const newAppointment = {
    title: data['title'] as string,
    date: data['date'] as string,
    time_start: data['time_start'] as string,
    time_end: data['time_end'] as string,
    full_day: isFullDay,
    category: data['category'] as string,
    created_by: authorId,
    visibility: data['visibility'] as string,
  }

  await updateAppointment(data['id'] as number, newAppointment)
  return {
    success: true,
  }
})

/**
 * Action to remove an appointment
 */
export const useRemoveAppointment = globalAction$(async (data) => {
  await deleteAppointment(data['id'] as number)

  return {
    success: true,
  }
})

/**
 * Send notification push
 */
export const useSendPushNotification = async () => {
  const apiKey = import.meta.env.VITE_API_KEY_PUSH

  const payload = new URLSearchParams({
    title: 'Test, this is like the minimum payload possible',
    message: 'Test message, this should be the minimum payload possible',
    url: 'https://qwik-calendar.vercel.app/',
    icon: 'https://qwik-calendar.vercel.app/home.png',
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

  const result = await response.json()

  if (result.success) {
    console.log('Notification sent, ID:', result.id)
    return {
      success: true,
      id: result.id,
    }
  } else {
    console.error('Failed to send push notification:', result)
    return {
      success: false,
      error: result,
    }
  }
}
