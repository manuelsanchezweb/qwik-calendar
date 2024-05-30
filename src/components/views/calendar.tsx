import { component$, noSerialize, useContextProvider, createContextId, useStore } from "@builder.io/qwik"
import Day from './Day'
import dayjs from 'dayjs'
import { Fragment } from "@builder.io/qwik"
import { type IAppointment } from "~/types/types";

interface DayStore {
  day: string;
} 

export const SelectedDayContext = 
    createContextId<DayStore>("selected-day")

const Calendar = component$(({currentMonth, appointments} : {currentMonth: any, appointments: Array<IAppointment>}) => {

      const dayStore: DayStore = useStore({
        day: dayjs().format('YYYY-MM-DD'),
      })
      

      useContextProvider(SelectedDayContext, dayStore)

      return (
        <div class='grid border grid-cols-7 grid-rows-5'>
            {currentMonth.map((row: any[], id: number) => (
                <Fragment key={id}>
                {row.map((day, idx) => (               
                    <Day day={noSerialize(day)} key={idx} appointments={appointments}/>
                ))}
                </Fragment>
            ))}
        </div>
      )
    }
  )

export default Calendar