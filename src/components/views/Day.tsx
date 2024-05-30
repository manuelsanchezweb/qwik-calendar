import { component$, useContext, $ } from "@builder.io/qwik"
import { Dayjs } from 'dayjs'
import { SelectedDayContext } from "./calendar"


const Day = component$(({day}: {day: Dayjs}) => {
    const thisDay = day.format('YYYY-MM-DD')
    const selectedDay = useContext(SelectedDayContext)

    const setSelectedDay = $(() => {
       selectedDay.day = thisDay 
    })

    console.log(appointments)


  return (
    <div    class={`flex justify-center aspect-square items-center hover:border-primary transition duration-300 ease-in-out border ${thisDay === selectedDay.day ? 'border-primary bg-primaryLight' :  'border-gray-200 bg-white'} cursor-pointer px-6 py-6`} 
            onClick$={() => setSelectedDay()}>

        <p class="w-fit text-text text-xl">
            {day.format('DD').replace('0', '')}
        </p>
        
                
    </div>
  )
})

export default Day