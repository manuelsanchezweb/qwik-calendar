import { component$ } from '@builder.io/qwik'
import type { IAppointment } from '~/types/types'
import  TaskCard from './taskCard'

export const ListView = component$(({appointments}: {appointments: Array<IAppointment>}) => {

    const sortedTasks = appointments.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    })
    

  
    // TODO: to improve later
    // const sortedTasks = useComputed$((appointments) => {
    //   const sortedTasks = appointments.sort((a, b) => {
    //     const dateA = new Date(a.date)
    //     const dateB = new Date(b.date)
    //     return dateA.getTime() - dateB.getTime()
    //   })
    //   return sortedTasks
    // })

    const today = new Date()

    let taskToday = false

    for (const task of appointments) {
      const taskDate = new Date(task.date)
      if (taskDate.toDateString() === today.toDateString()) {
        taskToday = true
        break
      }
    }

    return (
      <section
        title="List view"
        class="flex flex-col lg:flex-row  lg:gap-12 w-full"
      >
        <div class="flex flex-col order-last lg:order-first justify-start py-12 px-10 bg-grayBrandLight w-full rounded-lg my-6">
          <h2 class="text-4xl font-bold text-text">All Events</h2>
          {appointments.length === 0 ? (
            <p>No appointments</p>
          ) : (
            <ul class="flex flex-col pt-8 gap-8">
              {sortedTasks.map((task, idx) => {
  

                const showDate =
                  idx === 0 || sortedTasks[idx - 1].date !== task.date

                if (
                  today.toDateString() !== new Date(task.date).toDateString()
                ) {
                  return (
                    <TaskCard key={idx}
                              showDate={showDate} 
                              title={task.title} 
                              date={task.date} 
                              full_day={task.full_day}
                              time_start={task.time_start} 
                              time_end={task.time_end}
                              createdBy={task.createdBy} />
                  )
                }
              })}
            </ul>
          )}
        </div>

        <div class="flex flex-col w-full h-fit justify-start py-12 px-10 bg-grayBrandLight rounded-lg my-6">
          <h2 class="text-4xl font-bold text-text">Today</h2>

          {!taskToday ? (
            <p>No task today</p>
          ) : (
            <ul class="flex flex-col pt-8 gap-8">
              {sortedTasks.map((task, idx) => {
                const showDate = false

                if (
                  today.toDateString() === new Date(task.date).toDateString()
                ) {
                  return (
                    <TaskCard key={idx}
                              showDate={showDate} 
                              title={task.title} 
                              date={task.date} 
                              full_day={task.full_day}
                              time_start={task.time_start} 
                              time_end={task.time_end}
                              createdBy={task.createdBy} />
                  )
                }
              })}
            </ul>
          )}
        </div>
      </section>
    )
  }
)
