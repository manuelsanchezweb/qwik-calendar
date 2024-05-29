import { component$, useSignal } from '@builder.io/qwik'
import { type IAppointment, type IUser } from '~/types/types'

import { type ActionStore, Form } from '@builder.io/qwik-city'

const IS_DEBUG_ACTIVE = false

export const Debug = component$(
  ({
    users,
    appointments,
    action,
  }: {
    users: IUser[]
    appointments: IAppointment[]
    action: ActionStore<any, any, any>
  }) => {
    const isDebugOpened = useSignal(IS_DEBUG_ACTIVE)

    return isDebugOpened.value ? (
      <div class="absolute right-0 top-0 border-black border-2 flex flex-col gap-3 items-center justify-center bg-white">
        <button
          class="border-black border-b-2 p-2 w-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
          onClick$={() => (isDebugOpened.value = !isDebugOpened.value)}
        >
          Close debug
        </button>
        <div class="flex flex-col gap-4 px-2 pb-4">
          <h2 class="text-2xl">Users</h2>
          <table class="max-w-fit">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} class="[&>*]:px-5">
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 class="text-2xl">Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} class="[&>*]:px-5">
                  <td>{appointment.title}</td>
                  <td>{appointment.date}</td>
                  <td>
                    {appointment.full_day
                      ? 'Full day'
                      : `${appointment.time_start} - ${appointment.time_end}`}
                  </td>
                  <td>{appointment.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Form action={action}>
          <button class="border-black border-2 p-2 mb-2 bg-primaryLight hover:bg-primary focus:bg-primary">
            Create random appointent for tomorrow
          </button>
        </Form>
      </div>
    ) : (
      <button
        class="absolute right-0 top-0 border-black border-2 p-2 bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
        onClick$={() => (isDebugOpened.value = !isDebugOpened.value)}
      >
        Open debug
      </button>
    )
  }
)
