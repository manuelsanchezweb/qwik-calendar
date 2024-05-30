import { component$ } from "@builder.io/qwik"
import { Dayjs } from 'dayjs'



const Day = component$(({day}: {day: Dayjs}) => {

   

  return (
    <div class={`flex justify-center aspect-square items-center border ${day.format('YYYY-MM-DD') === '2024-05-22' ? 'border-primary bg-primaryLight' :  'border-gray-200 bg-white'} cursor-pointer px-6 py-6`} onClick$={() => alert('add Modal')}>
        <p class="w-fit text-text text-xl">
            {day.format('DD').replace('0', '')}
        </p>
                
    </div>
  )
})

export default Day