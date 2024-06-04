import { component$, type Signal } from '@builder.io/qwik'
import type { IAppointment, IUser } from '~/types/types'
import TaskCard from '../task-card'
import { getAuthorByTaskId } from '~/utils/functions'

export const TaskShow = component$(
  ({
    appointments,
    selectedDay,
    users,
    isEditAppointmentModalOpen,
    editModalData,
  }: {
    appointments: IAppointment[]
    selectedDay: Date
    users: Array<IUser>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: any
  }) => {
   
    // TODO: why when I click, the day I get is the previous one?
    console.log({ selectedDay })
    const formatDay = (day: Date) => {
        return `${selectedDay.getFullYear() + '-' + (day.getMonth()).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0')}`
    }

  


    return (
      <section aria-live="polite" aria-label="Tasks from the selected day">
        <h1 class="text-text sticky top-0 py-8 text-4xl font-semibold">
          {selectedDay.getDate().toString().padStart(2, '0') +
            '.' +
            selectedDay.getMonth().toString().padStart(2, '0') +
            '.' +
            selectedDay.getFullYear()}
        </h1>

        <ul class="flex flex-col pt-8 gap-8">
          {appointments.map((task, idx) => {
            const author = getAuthorByTaskId(task.created_by!, users)

            if (formatDay(selectedDay) === task.date) {
              return (
                <TaskCard
                  key={idx}
                  id={task.id}
                  category={task.category}
                  showDate={false}
                  showEdit={true}
                  title={task.title}
                  date={task.date}
                  full_day={task.full_day}
                  time_start={task.time_start}
                  time_end={task.time_end}
                  created_by={author}
                  isEditAppointmentModalOpen={isEditAppointmentModalOpen}
                  editModalData={editModalData}
                />
              )
            }
          })}
        </ul>
      </section>
    )
  }
)
