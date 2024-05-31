import { globalAction$ } from '@builder.io/qwik-city'
import { APP_USERS } from '~/config'

import { db } from '~/db/db'
import * as schema from '~/db/schema'
import { type IUser } from '~/types/types'
import { getListAvailablePasswords } from '~/utils/functions'

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

export const useAddAppointment = globalAction$(async () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const appointment = {
    title: 'Random appointment',
    date: tomorrow.toISOString().split('T')[0],
    time_start: '09:00',
    time_end: '10:00',
    full_day: 0,
    category: 'random',
    created_by: 1,
  }

  await db.insert(schema.appointmentsTable).values(appointment)

  return {
    success: true,
  }
})
