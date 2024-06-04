import { component$, useSignal, type Signal } from '@builder.io/qwik'
import { Calendar } from './calendar-components/calendar'
import { TaskShow } from './calendar-components/task-show'
import type { IAppointment, IUser } from '~/types/types'

export const CalendarView = component$(
  ({
    appointments,
    users,
    isAddAppointmentModalOpen,
    isEditAppointmentModalOpen,
    editModalData
  }: {
    appointments: IAppointment[],
    users: Array<IUser>,
    isAddAppointmentModalOpen: Signal<boolean>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: any
  }) => {
    const selectedDay = useSignal(new Date())

    return (
      <section
        aria-label="calendar view"
        class="flex flex-col lg:flex-row justify-between gap-6"
      >
        <div class="bg-grayBrandLight p-12 pt-2 rounded-xl w-full lg:w-1/2">
          <Calendar appointments={appointments} selectedDay={selectedDay} isAddAppointmentModalOpen={isAddAppointmentModalOpen}/>
        </div>
        <div class="bg-grayBrandLight overflow-hidden h-[60vh] overflow-y-scroll p-12 pt-2 rounded-xl w-full lg:w-1/2 ">
          <TaskShow
            appointments={appointments}
            selectedDay={selectedDay.value}
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
            users={users}
          />
        </div>
      </section>
    )
  }
)
