import { component$, useSignal } from '@builder.io/qwik'
import { Calendar } from './calendar-components/calendar'
import { TaskShow } from './calendar-components/task-show'
import type { IAppointment, IUser } from '~/types/types'


export const CalendarView = component$(({ appointments, users }: { appointments: IAppointment[], users: Array<IUser>}) => {
    const selectedDay = useSignal(new Date())

    return (
      <section aria-label="calendar view" class='flex justify-between gap-6'>
        <div class="bg-grayBrandLight p-12 pt-2 rounded-xl w-1/2">
          <Calendar appointments={appointments} selectedDay={selectedDay}/>
        </div>
        <div class="bg-grayBrandLight p-12 pt-2 rounded-xl w-1/2 ">
          <TaskShow appointments={appointments} selectedDay={selectedDay.value} users={users} />
        </div>
          
      </section>
    
  )}
)
