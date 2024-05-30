import { component$, noSerialize, useSignal } from "@builder.io/qwik"
import Day from './Day'
import dayjs from 'dayjs'
import { Dayjs } from 'dayjs'
import { Fragment } from "@builder.io/qwik"

const Calendar = component$(({currentMonth} : {currentMonth: Dayjs[][]}) => {


      return (
        <div class='grid border grid-cols-7 grid-rows-5'>
            {currentMonth.map((row: any[], id) => (
                <Fragment key={id}>
                {row.map((day, idx) => (               
                    <Day day={noSerialize(day)} key={idx}/>
                ))}
                </Fragment>
            ))}
        </div>
      )
    }
  )

export default Calendar