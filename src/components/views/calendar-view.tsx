import { component$ } from '@builder.io/qwik'
import { Calendar } from '../calendar'
import { type IAppointment } from '~/types/types'

export const CalendarView = component$(
  ({ appointments }: { appointments: Array<IAppointment> }) => {
    console.log(appointments)
    return (
      <div>
        <div>Calendar is missing!</div>
        <Calendar />
      </div>
    )
  }
)
