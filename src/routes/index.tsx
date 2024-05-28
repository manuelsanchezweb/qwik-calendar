import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { LoadingScreen } from '~/components/loading-screen/loading-screen'
import { IconManager } from '~/icons/icon-manager'
import { IS_LOADING_FROM_BEGINNING } from '~/config'
import { ListView } from '~/components/views/list-view'
import { CalendarView } from '~/components/views/calendar-view'
import { FAKE_APPOINTMENTS } from '~/data'

const VIEWS = {
  CALENDAR: 'CALENDAR',
  LIST: 'LIST',
} as const

type ViewsType = typeof VIEWS
type ViewKeys = ViewsType[keyof ViewsType]

function CurrentDay() {
  const day = new Date().getDate()
  return <div class="text-primary text-8xl">{day < 10 ? `0${day}` : day}</div>
}

function DayName() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayName = days[new Date().getDay()]
  return <span>{dayName}</span>
}

function CurrentMonthAndYear() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const date = new Date()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return <span>{`${month} ${year}`}</span>
}

const addTask = $(() => {
  alert('Add task')
})

export default component$(() => {
  const isLoading = useSignal(IS_LOADING_FROM_BEGINNING)
  const selectedView = useSignal<ViewKeys>(VIEWS.CALENDAR)

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
      <>
        {/* <Navigation userSignal={userSignal.value} /> */}
        {/* Active Date + Today Button */}
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="text-primary text-8xl">{CurrentDay()}</div>
            <div class="flex flex-col text-3xl">
              <span>{DayName()}</span>
              <span>{CurrentMonthAndYear()}</span>
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

        <span>Selected view: {selectedView.value}</span>

        {selectedView.value === VIEWS.CALENDAR ? (
          <CalendarView appointments={FAKE_APPOINTMENTS} />
        ) : (
          <ListView appointments={FAKE_APPOINTMENTS} />
        )}
      </>
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

// <div class="min-w-full flex items-center justify-center">
//   <AuthForm />
// </div>
