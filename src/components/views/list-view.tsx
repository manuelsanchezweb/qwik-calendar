import { component$ } from '@builder.io/qwik'
import { type FAKE_APPOINTMENTS } from '~/data'
import { IconManager } from '~/icons/icon-manager'

export const ListView = component$(({
    appointments
}: {
    appointments: typeof FAKE_APPOINTMENTS
}) => {

    const dateFormatted = (dateStr: string) => {
        const date = new Date(dateStr);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; 
        const year = date.getUTCFullYear();

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        return `${formattedDay}.${formattedMonth}.${year}`
    }
    
    const sortedTasks = appointments.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
      

      
    const today = new Date()
    
    let taskToday = false;

    for (const task of appointments) {
    const taskDate = new Date(task.date);
    if (taskDate.toDateString() === today.toDateString()) {
        taskToday = true;
        break;
    }
    }

    console.log(today)

    return (
    
        <section title="List view" class="flex flex-col lg:flex-row  lg:gap-12 w-full">
            <div class="flex flex-col order-last lg:order-first justify-start py-12 px-10 bg-grayBrandLight w-full rounded-lg my-6">
                <h1 class="text-4xl font-bold text-text">All Events</h1>
            {appointments.length === 0 ? <p>No appointments</p> : (
                <ul class="flex flex-col pt-8 gap-8">
                    {sortedTasks.map((task, idx) => {
                        const showDate = idx === 0 || sortedTasks[idx - 1].date !== task.date;

                        if(today.toDateString() !== new Date(task.date).toDateString()){ 
                            return (
                            <>
                                {showDate && (
                                <h2 class="text-primary text-2xl font-semibold">
                                    {dateFormatted(task.date)}
                                </h2>
                                )}

                                <div class="flex rounded-2xl gap-6 justify-between items-center w-full bg-primaryLight px-8 py-6">
                                    <div class="flex lg:justify-between w-2/3 lg:items-center lg:gap-2 flex-col lg:flex-row">
                                        <div class="flex flex-col gap-1">
                                            <h3 class="font-bold text-text text-lg">{task.title}</h3>
                                            <h4 class="text-primary font-semiold"> Manuel </h4>
                                        </div>


                                        <div class="text-xl text-text w-fit text-end">
                                            {task.fullDay ? 'All day' : task.timeStart.toString() + " - " + task.timeEnd.toString()}
                                        </div> 
                                    </div>
                                    
                                    
                                    <button class="flex justify-end" onClick$={() => alert("Open modal")}>
                                        <IconManager icon="edit" classCustom='h-12 w-12'/>
                                    </button>                                   
                                </div>
                            </>
                            
                        )
                    }})}
                </ul>
            )}
            </div>
            
            <div class="flex flex-col w-full h-fit justify-start py-12 px-10 bg-grayBrandLight rounded-lg my-6">
                <h1 class="text-4xl font-bold text-text">Today</h1>

                {!taskToday ? <p>No task today</p> : (
                <ul class="flex flex-col pt-8 gap-8">
                    {sortedTasks.map((task, idx) => {
                        if(today.toDateString() === new Date(task.date).toDateString()){
                            
                              return (
                                    <div key={idx} class="flex rounded-2xl gap-6 justify-between items-center w-full bg-primaryLight px-8 py-6">
                                        <div class="flex sm:justify-between w-2/3 sm:items-center sm:gap-2 flex-col sm:flex-row">
                                            <div class="flex flex-col gap-1">
                                                <h3 class="font-bold text-text text-lg">{task.title}</h3>
                                                <h4 class="text-primary font-semiold"> Manuel </h4>
                                            </div>


                                            <div class="text-xl text-text w-fit text-end">
                                                {task.fullDay ? 'All day' : task.timeStart.toString() + " - " + task.timeEnd.toString()}
                                            </div> 
                                        </div>
                                        
                                        
                                        <button class="flex justify-end" onClick$={() => alert("Open modal")}>
                                            <IconManager icon="edit" classCustom='h-12 w-12'/>
                                        </button>                                   
                                    </div>
                            )

                    }})}
                </ul>
            )}
            </div>

        </section>

    )
})
