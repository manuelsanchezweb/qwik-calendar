import { component$ } from '@builder.io/qwik'
import { Calendar } from '../calendar'
import { type FAKE_APPOINTMENTS } from '~/data'

export const CalendarView = component$(({
    appointments
}: {
    appointments: typeof FAKE_APPOINTMENTS
}) => {
    console.log(appointments)
    return (
        <div>
            <div> Calendar is missing!</div>
            <Calendar />
        </div>

    )

})
