import { $, component$, useSignal } from '@builder.io/qwik'
import {
  type RequestEventBase,
  routeLoader$,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { IconManager } from '~/icons/icon-manager'
import { ListView } from '~/components/views/list-view'
import { CalendarView } from '~/components/views/calendar-view'
import { Debug } from '~/components/debug'
import {
  getCurrentDay,
  getCurrentMonthAndYear,
  getDayName,
} from '~/utils/functions'
import { VIEWS, type ViewKeys } from '~/constants/constants'
import { type IAppointment, type IUser } from '~/types/types'

import { useAddAppointment } from '~/global'
import { PastAppointmentsView } from '~/components/views/past-appointment-view'
import { ViewsButtons } from '~/components/views-buttons/views-buttons'
import { getAppointments, getUsers } from '~/db/queries'
import { LoginForm } from '~/components/login-form/login-form'
import { Footer } from '~/components/footer/footer'

export const useUsersAndAppointments = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    // Get the view from the URL
    const viewFromURL = new URLSearchParams(requestEvent.query)
    const initialView = viewFromURL.get('view')?.toUpperCase() as ViewKeys

    // Get the users and appointments
    const users = await getUsers()
    const appointments = await getAppointments()

    // Check if user is authorized and who is the user
    const isAuthorized =
      requestEvent.cookie.get('collabender-rules')?.value === '1' ?? false
    const userName =
      requestEvent.cookie.get('collabender-user')?.value ?? 'Undefined'

    return {
      users: users as IUser[],
      appointments: appointments as IAppointment[],
      initialView,
      isAuthorized,
      userName,
    }
  }
)

const addTask = $(() => {
  alert('Add task')
})

export default component$(() => {
  const items = useUsersAndAppointments()
  const { users, appointments, initialView, isAuthorized, userName } =
    items.value

  const selectedView = useSignal<ViewKeys>(initialView)
  const action = useAddAppointment()

  if (!isAuthorized) return <LoginForm />

  return (
    <>
      <main class="py-12">
        <Debug action={action} users={users} appointments={appointments} />
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="text-primary text-8xl">{getCurrentDay()}</div>
            <div class="flex flex-col text-3xl">
              <span>{getDayName()}</span>
              <span>{getCurrentMonthAndYear()}</span>
            </div>
          </div>
          <button class="btn" onClick$={() => alert('Hoy')}>
            Today
          </button>
          <small class="text-primary text-lg">
            Howdy, <span class="font-bold">{userName}</span>! 👋
          </small>
        </div>

        {/* Filter Buttons + Add Button  */}
        <div class="flex justify-between items-center bg-grayBrandLight py-6 px-4 rounded-md my-6">
          <ViewsButtons selectedView={selectedView} />

          <button
            onClick$={addTask}
            class="transition-transform hover:scale-105 focus:scale-105"
          >
            <IconManager icon="add" classCustom="w-12 h-auto" />
          </button>
        </div>

        {selectedView.value === VIEWS.CALENDAR ? (
          <CalendarView appointments={appointments} />
        ) : (
          ''
        )}

        {selectedView.value === VIEWS.LIST ? (
          <ListView appointments={appointments} users={users} />
        ) : (
          ''
        )}

        {selectedView.value === VIEWS.PAST_APPOINTMENTS ? (
          <PastAppointmentsView appointments={appointments} users={users} />
        ) : (
          ''
        )}
      </main>
      <Footer />
    </>
  )
})

export const head: DocumentHead = {
  title: 'Calendar App con Qwik',
  meta: [
    {
      name: 'description',
      content: 'Crea una app de calendario compartida con Qwik!',
    },
  ],
}
