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
    isAddAppointmentModalOpen,
    userName,
    hasMaxHeight,
  }: {
    appointments: IAppointment[]
    selectedDay: Date
    users: Array<IUser>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: IAppointment
    isAddAppointmentModalOpen: Signal<boolean>
    userName: string
    hasMaxHeight?: boolean
  }) => {
    const formatDay = (day: Date) => {
      return `${day.getFullYear() + '-' + (day.getMonth() + 1).toString().padStart(2, '0') + '-' + day.getDate().toString().padStart(2, '0')}`
    }
    const isThereAnyTaskThisDay = appointments.some(
      (task) => formatDay(selectedDay) === task.date
    )

    return (
      <section aria-live="polite" aria-label="Tasks from the selected day">
        <h2 class="text-text text-3xl py-4 font-semibold">
          {selectedDay.getDate().toString().padStart(2, '0') +
            '.' +
            (selectedDay.getMonth() + 1).toString().padStart(2, '0') +
            '.' +
            selectedDay.getFullYear()}
        </h2>
        {isThereAnyTaskThisDay ? (
          <ul
            class={`flex flex-col pt-8 gap-8 overflow-y-scroll ${hasMaxHeight ? 'max-h-[400px]' : 'overflow-hidden'}`}
          >
            {appointments.map((task, idx) => {
              const author = getAuthorByTaskId(task.created_by!, users)

              if (formatDay(selectedDay) === task.date) {
                return (
                  <TaskCard
                    key={idx}
                    id={task.id}
                    category={task.category}
                    showDate={false}
                    showEdit={author === userName}
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
        ) : (
          <>
            <p class="font-light opacity-55">
              You do not have any task yet for this day.
            </p>
            <button
              onClick$={() => {
                isAddAppointmentModalOpen.value = true
                document.body.style.overflow = 'hidden'
              }}
              class="btn my-5 font-semibold transition ease-in-out duration-300 "
            >
              Create one
            </button>
          </>
        )}
      </section>
    )
  }
)
