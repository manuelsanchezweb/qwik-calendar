import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import {
  type RequestEventBase,
  routeLoader$,
  type DocumentHead,
} from '@builder.io/qwik-city'
import { LoadingScreen } from '~/components/loading-screen/loading-screen'
import { IconManager } from '~/icons/icon-manager'
import { IS_LOADING_FROM_BEGINNING } from '~/config'
import { ListView } from '~/components/views/list-view'
import { CalendarView } from '~/components/views/calendar-view'
import { Debug } from '~/components/debug'
import {
  getCurrentDay,
  getCurrentMonthAndYear,
  getDayName,
} from '~/utils/functions'
import { APP_VERSION, VIEWS, type ViewKeys } from '~/constants/constants'
import { type IAppointment, type IUser } from '~/types/types'

import { useAddAppointment } from '~/global'
import { PastAppointmentsView } from '~/components/views/past-appointment-view'
import { ViewsButtons } from '~/components/views-buttons/views-buttons'
import { getAppointments, getUsers } from '~/db/queries'

export const useUsersAndAppointments = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    // Get the view from the URL
    const viewFromURL = new URLSearchParams(requestEvent.query)
    const initialView = viewFromURL.get('view')?.toUpperCase() as ViewKeys

    // Get the users and appointments
    const users = await getUsers()
    const appointments = await getAppointments()

    return {
      users: users as IUser[],
      appointments: appointments as IAppointment[],
      initialView,
    }
  }
)

const addTask = $(() => {
  alert('Add task')
})

export default component$(() => {
  const items = useUsersAndAppointments()
  const { users, appointments, initialView } = items.value

  const isLoading = useSignal(IS_LOADING_FROM_BEGINNING)
  const selectedView = useSignal<ViewKeys>(initialView)
  const action = useAddAppointment()

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   userSignal.value = session?.user ?? null
    // })

    setTimeout(() => {
      isLoading.value = false
    }, 2000)

    // const {
    //   data: { subscription: authListener },
    // } = supabase.auth.onAuthStateChange((_, session) => {
    //   const currentUser = session?.user
    //   userSignal.value = currentUser ?? null
    //   isLoading.value = false
    // })

    // return () => {
    //   authListener?.unsubscribe()
    // }
  })

  if (isLoading.value) return <LoadingScreen />

  return (
    <>
      <main class="py-12">
        {/* <Navigation userSignal={userSignal.value} /> */}
        {/* Active Date + Today Button */}
        <Debug action={action} users={users} appointments={appointments} />
        {/* <Form action={action}>
          <button>Submit me</button>
        </Form> */}
        {/* <Form action={action}>
          <button class="border-black border-2 p-2 mb-2 bg-primaryLight hover:bg-primary focus:bg-primary">
            Create random appointent for tomorrow
          </button>
        </Form> */}
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
      <footer>Version {APP_VERSION}</footer>
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
