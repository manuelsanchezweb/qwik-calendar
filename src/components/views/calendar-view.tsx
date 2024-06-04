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
    editModalData,
    userName,
  }: {
    appointments: IAppointment[]
    users: Array<IUser>
    isAddAppointmentModalOpen: Signal<boolean>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: IAppointment
    userName: string
  }) => {
    const selectedDay = useSignal(new Date())
    const hasAppointments = appointments.length > 0

    return (
      <section
        aria-label="calendar view"
        class="flex flex-col lg:flex-row justify-between gap-6"
      >
        <div class="bg-grayBrandLight p-6 md:p-12 pt-2 rounded-xl w-full lg:w-1/2">
          <Calendar
            appointments={appointments}
            selectedDay={selectedDay}
            isAddAppointmentModalOpen={isAddAppointmentModalOpen}
          />
        </div>
        <div
          class={`bg-grayBrandLight h-[60vh] p-6 md:p-12 pt-2 rounded-xl w-full lg:w-1/2  ${hasAppointments ? 'overflow-y-scroll' : 'overflow-hidden'}`}
        >
          <TaskShow
            userName={userName}
            appointments={appointments}
            selectedDay={selectedDay.value}
            isEditAppointmentModalOpen={isEditAppointmentModalOpen}
            editModalData={editModalData}
            users={users}
            isAddAppointmentModalOpen={isAddAppointmentModalOpen}
          />
        </div>
      </section>
    )
  }
)
