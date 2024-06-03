import {
  component$,
  $,
  useSignal,
  type Signal,
  useTask$,
} from '@builder.io/qwik'
import type { IAppointment, CalendarDay } from '~/types/types'
import { buildCalendar, getMonthName } from './calendar-functions'

export const Calendar = component$(
  ({
    appointments,
    selectedDay,
  }: {
    appointments: IAppointment[]
    selectedDay: Signal<Date>
  }) => {
    const date = useSignal(new Date())
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
      selectedDay.value = new Date(day.year, day.month + 1, day.day)
    })

    return (
      <div class="md:min-h-[550px]">
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
              const id = `${day.year}-${(day.month + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`
              const hasTask = appointments.some((event) => event.date === id)

              return (
                <button
                  key={index}
                  data-id={id}
                  onClick$={() => setSelectedDay(day)}
                  class={`flex relative justify-center hover:border-primary ease-in-out duration-100 transition aspect-square items-center cursor-pointer border
                    ${day.disabled ? 'bg-gray-100 pointer-events-none text-gray-400' : ''}
                    ${day.day === selectedDay.value.getDate() && day.month === selectedDay.value.getMonth() - 1 && day.year === selectedDay.value.getFullYear() ? 'bg-primaryLight text-primary border-primary' : ''}`}
                >
                  {day.day}
                  {hasTask ? (
                    <p class="absolute w-2 h-2 top-0 right-0 md:top-2 md:right-2">
                      <svg
                        width="9"
                        height="9"
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
