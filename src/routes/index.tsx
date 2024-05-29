import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import {
  type RequestEventBase,
  routeLoader$,
  type DocumentHead,
  routeAction$,
} from '@builder.io/qwik-city'
import { LoadingScreen } from '~/components/loading-screen/loading-screen'
import { IconManager } from '~/icons/icon-manager'
import { IS_LOADING_FROM_BEGINNING } from '~/config'
import { ListView } from '~/components/views/list-view'
import { CalendarView } from '~/components/views/calendar-view'
import { Debug } from '~/components/debug'
import { tursoClient } from '~/lib/turso'
import {
  getCurrentDay,
  getCurrentMonthAndYear,
  getDayName,
} from '~/utils/functions'
import { APP_VERSION, VIEWS, type ViewKeys } from '~/constants/constants'
import { type IAppointment, type IUser } from '~/types/types'
// import { db } from '~/db/db'
// import * as schema from '~/db/schema'

export const useTestAction = routeAction$(async () => {
  // TODO: fix this --> we have an issue with dotenv not recognizing the .env file
  // db.insert(schema.appointmentsTable).values({
  //   title: 'Random appointment',
  //   date: '2024-10-01',
  //   time_start: '09:00',
  //   time_end: '10:00',
  //   full_day: 0,
  //   category: 'random',
  //   created_by: 1,
  // })

  console.log('Test action')

  return {
    success: true,
  }
})

export const useUsersAndAppointments = routeLoader$(
  async (requestEvent: RequestEventBase) => {
    const client = tursoClient(requestEvent)

    const users = await client.execute('SELECT * FROM users')
    const appointments = await client.execute('SELECT * FROM appointments')

    return {
      users: users.rows as unknown as IUser[],
      appointments: appointments.rows as unknown as IAppointment[],
    }
  }
)

const addTask = $(() => {
  alert('Add task')
})

export default component$(() => {
  const isLoading = useSignal(IS_LOADING_FROM_BEGINNING)
  const selectedView = useSignal<ViewKeys>(VIEWS.LIST)
  const action = useTestAction()

  const items = useUsersAndAppointments()
  const { users, appointments } = items.value

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
          <div class="flex gap-2 items-center">
            <button
              onClick$={() => (selectedView.value = VIEWS.CALENDAR)}
              class="transition-transform hover:scale-105 focus:scale-105"
            >
              <IconManager
                icon={
                  selectedView.value === VIEWS.CALENDAR
                    ? 'calendar-fill'
                    : 'calendar'
                }
                classCustom="w-12 h-auto mb-1"
              />
            </button>
            <button
              onClick$={() => (selectedView.value = VIEWS.LIST)}
              class="transition-transform hover:scale-105 focus:scale-105"
            >
              <IconManager
                icon={selectedView.value === VIEWS.LIST ? 'list-fill' : 'list'}
                classCustom="w-12 h-auto mb-1"
              />
            </button>
          </div>

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
          <ListView appointments={appointments} />
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
