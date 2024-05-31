import { component$, noSerialize, type Store } from "@builder.io/qwik"
import Day from './Day'
import { Fragment } from "@builder.io/qwik"
import { type IAppointment, type DayStore } from "~/types/types";
import  { type Dayjs } from 'dayjs'


interface CalendarProps {
  currentMonth: any
  appointments: Array<IAppointment>
  selectedDay: DayStore
}


const Calendar = component$(({currentMonth, appointments, selectedDay} : CalendarProps) => {

 
      return (
        <div class='grid border grid-cols-7 grid-rows-5'>
            {currentMonth.map((row: Dayjs[], id: number) => (
                <Fragment key={id}>
                {row.map((day: any, idx) => (               
                    <Day day={noSerialize(day)} key={idx} appointments={appointments} selectedDay={selectedDay}/>
                ))}
                </Fragment>
            ))}
        </div>
      )
    }
  )

export default Calendar