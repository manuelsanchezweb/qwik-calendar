import { component$, useComputed$ } from '@builder.io/qwik'
import { type IUser, type IAppointment } from '~/types/types'
import TaskCard from './task-card'
import { getAuthorByTaskId, parseTime } from '~/utils/functions'

export const PastAppointmentsView = component$(
  ({
    appointments,
    users,
  }: {
    appointments: Array<IAppointment>
    users: Array<IUser>
  }) => {
    const pastAppointments = useComputed$(() => {
      if (appointments.length === 0) return []
      // Filter by date --> only get appointments before today but sort them chronologically from most recent to oldest
      let pastAppointments = appointments.filter(
        (appointment) => new Date(appointment.date) < new Date()
      )

      // Exlude today's appointments
      pastAppointments = pastAppointments.filter(
        (appointment) =>
          new Date(appointment.date).toDateString() !==
          new Date().toDateString()
      )

      // Sort chronologically by date (from most recent to oldest) and time_start (from earliest to latest)
      pastAppointments = pastAppointments.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)

        if (dateA.getTime() !== dateB.getTime()) {
          return dateB.getTime() - dateA.getTime()
        } else if (a.full_day !== b.full_day) {
          return a.full_day ? -1 : 1
        } else {
          const timeA = parseTime(a.time_start)
          const timeB = parseTime(b.time_start)
          return timeA.getTime() - timeB.getTime()
        }
      })

      return pastAppointments
    })

    return (
      <section
        title="List view"
        class="flex flex-col lg:flex-row  lg:gap-12 w-full"
      >
        <div class="flex flex-col order-last lg:order-first justify-start py-12 px-10 bg-grayBrandLight w-full rounded-lg my-6">
          <h2 class="text-4xl font-bold text-text">Past Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments</p>
          ) : (
            <ul class="flex flex-col pt-8 gap-8">
              {pastAppointments.value.map((task, idx) => {
                const author = getAuthorByTaskId(task.created_by!, users)

                const showDate =
                  idx === 0 ||
                  pastAppointments.value[idx - 1].date !== task.date

                return (
                  <TaskCard
                    key={idx}
                    id={task.id}
                    category={task.category}
                    showDate={showDate}
                    showEdit={false}
                    title={task.title}
                    date={task.date}
                    full_day={task.full_day}
                    time_start={task.time_start}
                    time_end={task.time_end}
                    created_by={author}
                    visibility={task.visibility}
                    isEditAppointmentModalOpen={null}
                    editModalData={null}
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
