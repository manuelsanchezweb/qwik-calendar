import { component$, useComputed$, type Signal } from '@builder.io/qwik'
import { type IUser, type IAppointment } from '~/types/types'
import TaskCard from './task-card'
import { getAuthorByTaskId, parseTime } from '~/utils/functions'

export const ListView = component$(
  ({
    appointments,
    users,
    isEditAppointmentModalOpen,
    editModalData,
    userName,
  }: {
    appointments: Array<IAppointment>
    users: Array<IUser>
    isEditAppointmentModalOpen: Signal<boolean>
    editModalData: IAppointment
    userName: string
  }) => {
    const futureAppointments = useComputed$(() => {
      if (appointments.length === 0) return []
      // Filter by date --> only get appointments from today
      let futureAppointments = appointments.filter(
        (appointment) => new Date(appointment.date) >= new Date()
      )

      // Sort chronologically by date and time_start
      futureAppointments = futureAppointments.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime()
        } else if (a.full_day !== b.full_day) {
          return a.full_day ? -1 : 1
        } else {
          const timeA = parseTime(a.time_start)
          const timeB = parseTime(b.time_start)
          return timeA.getTime() - timeB.getTime()
        }
      })

      return futureAppointments
    })

    const today = new Date()

    const todayAppointments = useComputed$(() => {
      if (appointments.length === 0) return []

      let todayAppointments = appointments.filter(
        (appointment) =>
          new Date(appointment.date).toDateString() === today.toDateString()
      )

      // Sort chronologically by full_day and time_start
      todayAppointments = todayAppointments.sort((a, b) => {
        if (a.full_day !== b.full_day) {
          return a.full_day ? -1 : 1
        } else {
          const timeA = parseTime(a.time_start)
          const timeB = parseTime(b.time_start)
          return timeA.getTime() - timeB.getTime()
        }
      })

      return todayAppointments
    })

    const taskToday = todayAppointments.value.length > 0

    return (
      <section
        title="List view"
        class="flex flex-col-reverse lg:flex-row lg:gap-12 w-full"
      >
        <div class="flex flex-col justify-start py-12 px-10 bg-grayBrandLight w-full rounded-lg my-6">
          <h2 class="text-4xl font-bold text-text">All Events</h2>
          {appointments.length === 0 ? (
            <p class="font-light py-4">No appointments</p>
          ) : (
            <ul class="flex flex-col pt-8 gap-8">
              {futureAppointments.value.map((task, idx) => {
                const author = getAuthorByTaskId(task.created_by!, users)

                const showDate =
                  idx === 0 ||
                  futureAppointments.value[idx - 1].date !== task.date

                if (
                  today.toDateString() !== new Date(task.date).toDateString()
                ) {
                  return (
                    <TaskCard
                      key={idx}
                      id={task.id}
                      showDate={showDate}
                      showEdit={author === userName}
                      title={task.title}
                      date={task.date}
                      full_day={task.full_day}
                      time_start={task.time_start}
                      time_end={task.time_end}
                      created_by={author}
                      category={task.category}
                      isEditAppointmentModalOpen={isEditAppointmentModalOpen}
                      editModalData={editModalData}
                    />
                  )
                }
              })}
            </ul>
          )}
        </div>

        <div class="flex flex-col w-full h-fit justify-start py-12 px-10 bg-grayBrandLight rounded-lg my-6">
          <h2 class="text-4xl font-bold text-text">Events Today</h2>

          {!taskToday ? (
            <p>No task today</p>
          ) : (
            <ul class="flex flex-col pt-8 gap-8">
              {todayAppointments.value.map((task, idx) => {
                const author = getAuthorByTaskId(task.created_by!, users)

                return (
                  <TaskCard
                    showEdit={author === userName}
                    key={idx}
                    category={task.category}
                    id={task.id}
                    showDate={false}
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
              })}
            </ul>
          )}
        </div>
      </section>
    )
  }
)
