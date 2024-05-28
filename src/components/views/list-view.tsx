import { component$ } from '@builder.io/qwik'
import { type FAKE_APPOINTMENTS } from '~/data'
import { IconManager } from '~/icons/icon-manager'

export const ListView = component$(({
    appointments
}: {
    appointments: typeof FAKE_APPOINTMENTS
}) => {
    return (
    
        <div>
            <div>List view</div>
            {appointments.length === 0 ? <p>No appointments</p> : (
                <ul class="flex flex-col gap-4">
                    {appointments.map((task) => {
                        return (
                            <>
                                <li
                                    key={task.id}
                                    class="flex gap-4 bg-primaryLight max-w-[600px] flex-col p-4 rounded-md"
                                >
                                    <p>{task.title}</p>
                                    <p>{task.date}</p>
                                    {task.fullDay ? (
                                        <p>Full day</p>
                                    ) : (
                            
                                        <p>
                                            {task.timeStart} - {task.timeEnd}
                                        </p>
                                
                                    )}
                                    <p>{task.category}</p>

                                    <button onClick$={() => console.log(task)}>
                                        <IconManager icon="edit" classCustom="w-6 h-auto" />
                                    </button>
                                </li>
                            </>
                        )
                    })}
                </ul>
            )}
        </div>

    )
})
