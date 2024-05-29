import { component$ } from '@builder.io/qwik'
import { Calendar } from '../calendar'
import { type IAppointment } from '~/types/types'

export const CalendarView = component$(
  ({ appointments }: { appointments: Array<IAppointment> }) => {
    return (
      <div>
        <div>Calendar is missing!</div>
        {appointments.length === 0 ?? <p>No people</p>}
        <Calendar />
      </div>
    )
  }
)
