import { globalAction$ } from '@builder.io/qwik-city'
import { APP_USERS } from '~/config'

import { db } from '~/db/db'
import * as schema from '~/db/schema'
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
  }

  await db.insert(schema.appointmentsTable).values(appointment)

  return {
    success: true,
  }
})
