import { component$, $, useSignal, type Signal } from '@builder.io/qwik'
import type { IAppointment, CalendarDay, IUser } from '~/types/types'
import { buildCalendar, getMonthName } from './calendar-functions'
import { getAuthorByTaskId } from '~/utils/functions'

export const Calendar = component$(
  ({
    appointments,
    selectedDay,
    isAddAppointmentModalOpen,
    userName,
    users,
  }: {
    appointments: IAppointment[]
    selectedDay: Signal<Date>
    isAddAppointmentModalOpen: Signal<boolean>
    userName: string
    users: Array<IUser>
  }) => {
    const date = useSignal(selectedDay.value)
    const weeks = buildCalendar(date.value)

    const incrementMonth = $(() => {
      const previousYear = date.value.getFullYear()
      const previousMonth = date.value.getMonth()
      date.value = new Date(previousYear, previousMonth + 1)
    })

    const decrementMonth = $(() => {
      const previousYear = date.value.getFullYear()
      const previousMonth = date.value.getMonth()
      date.value = new Date(previousYear, previousMonth - 1)
    })

    const setSelectedDay = $((day: CalendarDay) => {
      selectedDay.value = new Date(day.year, day.month, day.day)
      // add the ?day=2022-01-01 to the URL without removing the view from the user
      const url = new URL(window.location.href)
      url.searchParams.set(
        'day',
        `${day.year}-${(day.month + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`
      )
      window.history.pushState({}, '', url.toString())
    })

    const openOnDoubleClick = $((day: any) => {
      if (
        day.day === Number(selectedDay.value.getDate()) &&
        day.month === Number(selectedDay.value.getMonth()) &&
        day.year === Number(selectedDay.value.getFullYear())
      ) {
        isAddAppointmentModalOpen.value = true
      } else {
        setSelectedDay(day)
      }
    })

    return (
      <div class="h-fit">
        <div class="flex gap-4 py-6 justify-between">
          <div class="flex gap-8">
            <button onClick$={decrementMonth}>
              <svg
                width="20"
                height="34"
                viewBox="0 0 20 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.45 32.6335L2.83154 17.015L18.45 1.39655"
                  stroke="#2B7277"
                  stroke-width="3.38278"
                />
              </svg>
            </button>
            <h2 class="text-text text-2xl md:text-4xl font-semibold ">
              {getMonthName(date.value.getMonth(), date.value.getFullYear())}
            </h2>
          </div>

          <button onClick$={incrementMonth} class="rotate-180">
            <svg
              width="20"
              height="34"
              viewBox="0 0 20 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.45 32.6335L2.83154 17.015L18.45 1.39655"
                stroke="#2B7277"
                stroke-width="3.38278"
              />
            </svg>
          </button>
        </div>

        {/* New button */}
        <div class="overflow-x-auto mt-auto">
          <ul class="w-full justify-around flex text-center text-text text-xl">
            <li>Mo</li>
            <li>Tu</li>
            <li>We</li>
            <li>Th</li>
            <li>Fr</li>
            <li>Sa</li>
            <li>Su</li>
          </ul>

          <div class="grid grid-cols-7 h-fit mt-4 border">
            {weeks.flat().map((day, index) => {
              const id = `${day.year}-${day.month.toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`

              const hasTask = appointments.some(
                (event) =>
                  (event.visibility === 'private' &&
                    getAuthorByTaskId(event.created_by as number, users) ===
                      userName &&
                    event.date ===
                      `${day.year}-${(day.month + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`) ||
                  (event.visibility === 'public' &&
                    event.date ===
                      `${day.year}-${(day.month + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`)
              )

              const selected =
                selectedDay.value.getFullYear() +
                '-' +
                selectedDay.value.getMonth().toString().padStart(2, '0') +
                '-' +
                selectedDay.value.getDate().toString().padStart(2, '0')
              // console.log(selected)
              // console.log(id)

              return (
                <button
                  key={index}
                  id={id}
                  data-id={id}
                  onClick$={() => {
                    openOnDoubleClick(day)
                    // console.log('id', id)
                  }}
                  class={`calendar-day flex relative justify-center hover:border-primary ease-in-out duration-100 transition aspect-square items-center cursor-pointer border
                    ${day.disabled ? 'bg-gray-100 pointer-events-none text-gray-400' : ''}
                    ${id === selected ? 'bg-primaryLight text-primary border-primary' : ''}`}
                >
                  {day.day}

                  {hasTask ? (
                    <p class="absolute w-2 h-2 top-1 right-0 sm:top-2 sm:right-2">
                      <svg
                        class="w-[6px] h-[6px] sm:w-2 sm:h-2"
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="4.6705"
                          cy="4.61552"
                          r="3.84135"
                          fill="#2B7277"
                        />
                      </svg>
                    </p>
                  ) : (
                    ''
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
)
