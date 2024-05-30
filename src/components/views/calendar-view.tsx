import { component$, useSignal, $, noSerialize, useTask$ } from '@builder.io/qwik'
import  Calendar  from './calendar'
import dayjs from 'dayjs'
import { getMonth } from '~/utils/month'


export const CalendarView = component$(() => {

    const monthIndex = useSignal(0)
    const currentMonth = useSignal(noSerialize(getMonth()))

    useTask$(( { track }) => {
      track(() => monthIndex.value)
      currentMonth.value = noSerialize(getMonth(monthIndex.value))
    })
    
    const handlePrevMonth = $(() => monthIndex.value--)
  
    const handleNextMonth = $(() => monthIndex.value++)
      
    
    const handleReset = $(() => 
      monthIndex.value = monthIndex.value === dayjs().month() ? monthIndex.value + Math.random() : dayjs().month() 
    )
  
    return (
      <section title="calendar view" class="bg-grayBrandLight rounded-lg pb-6 px-12 w-2/3">
        <header class="px-4 py-2 flex justify-between">
          <div class='flex items-center py-6'>
              <button onClick$={handlePrevMonth}>
              <span class=" text-primary  cursor-pointer text-6xl mx-2" >
              {'<'}
              </span>
            </button>
            
            <h2 class="ml-4 text-4xl text-text font-semibold ">
              {dayjs(new Date(dayjs().year(), monthIndex.value)).format("MMMM YYYY")}
            </h2>
          </div>
          
          <button onClick$={handleNextMonth}>
            <span class=" text-primary cursor-pointer text-6xl w-full text-end mx-2" >
              {'>'}
            </span>
          </button>
        </header>

        <ul class="grid grid-cols-7 text-center text-2xl pb-6 ">
          <li>Su</li>
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
        </ul>
        <Calendar currentMonth={currentMonth.value}/> 
      </section>
      
    )
  }
)
