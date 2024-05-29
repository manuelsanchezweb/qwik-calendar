import { globalAction$ } from '@builder.io/qwik-city'

import { db } from '~/db/db'
import * as schema from '~/db/schema'

// TODO: fix and find out why when this is active there is build server error
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

  const appointmentId = await db
    .insert(schema.appointmentsTable)
    .values(appointment)
  console.log(appointmentId)
  console.log(db, schema)

  return {
    success: true,
  }
})
