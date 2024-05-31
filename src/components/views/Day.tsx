import { component$, $ } from "@builder.io/qwik"
import type { Dayjs } from 'dayjs'

import type { IAppointment, DayStore } from "~/types/types"


const Day = component$(({day, appointments, selectedDay}: {day: Dayjs, appointments: Array<IAppointment>, selectedDay: DayStore}) => {
    const thisDay = day.format('YYYY-MM-DD')
    const hasTask = appointments.some(event => event.date === day.format('YYYY-MM-DD'));
    

    selectedDay.day = '2024-03-02'
    console.log(selectedDay.day)
    console.log(thisDay)


    const setSelectedDay = $(() => {
        selectedDay.day = thisDay
    })

  return (
    <div class={`flex relative justify-center aspect-square items-center hover:border-primary transition duration-300 ease-in-out border ${thisDay === selectedDay.day ? 'border-primary bg-primaryLight' :  'border-gray-200 bg-white'} cursor-pointer px-6 py-6`} 
         onClick$={() => setSelectedDay()}>

        <p class="w-fit text-text text-xl">
            {day.format('DD').replace('0', '')}
        </p>
        {hasTask && (
            <p class="absolute top-2 right-2">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4.6705" cy="4.61552" r="3.84135" fill="#2B7277"/>
                </svg>
            </p>
        )}
    </div>
  )
})

export default Day