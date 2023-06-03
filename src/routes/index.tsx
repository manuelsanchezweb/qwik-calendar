import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calendar } from '~/components/calendar'
import type { User } from '@supabase/supabase-js'
import { supabase } from '~/lib/db'
import { AuthForm } from '~/components/auth'
import { Navigation } from '~/components/navigation'
import { LoadingScreen } from '~/components/loading-screen/loading-screen'
import { IconManager } from '~/icons/icon-manager'

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

export default component$(() => {
  const userSignal = useSignal<User | null>()
  const isLoading = useSignal(true)
  const selectedView = useSignal<ViewKeys>(VIEWS.CALENDAR)

  useVisibleTask$(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      userSignal.value = session?.user ?? null
    })

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user
      userSignal.value = currentUser ?? null
      isLoading.value = false
    })

    return () => {
      authListener?.unsubscribe()
    }
  })

  if (isLoading.value) return <LoadingScreen />

  const date = new Date()
  console.log(date)

  return (
    <>
      {userSignal.value ? (
        <>
          <Navigation userSignal={userSignal.value} />
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
                {selectedView.value === VIEWS.CALENDAR ? (
                  <IconManager
                    icon="calendar-fill"
                    classCustom="w-12 h-auto mb-1"
                  />
                ) : (
                  <IconManager icon="calendar" classCustom="w-12 h-auto mb-1" />
                )}
              </button>
              <button
                onClick$={() => (selectedView.value = VIEWS.LIST)}
                class="transition-transform hover:scale-105 focus:scale-105"
              >
                {selectedView.value === VIEWS.LIST ? (
                  <IconManager
                    icon="list-fill"
                    classCustom="w-12 h-auto mb-1"
                  />
                ) : (
                  <IconManager icon="list" classCustom="w-12 h-auto mb-1" />
                )}
              </button>
            </div>

            <button class="transition-transform hover:scale-105 focus:scale-105">
              {' '}
              <IconManager icon="add" classCustom="w-12 h-auto" />
            </button>
          </div>

          <span>Vista seleccionada: {selectedView.value}</span>
          {selectedView.value === VIEWS.CALENDAR ? (
            <Calendar />
          ) : (
            <div class="flex flex-col gap-4">
              <p>sdasd</p>
            </div>
          )}
        </>
      ) : (
        <div class="min-w-full flex items-center justify-center">
          <AuthForm />
        </div>
      )}
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
