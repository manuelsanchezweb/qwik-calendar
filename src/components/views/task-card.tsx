import { component$, $, type Signal } from '@builder.io/qwik'
import { getFormattedDate } from '~/utils/functions'
import { IconManager } from '~/icons/icon-manager'
import { type IAppointment } from '~/types/types'

interface IProps {
  created_by: number | string
  id: number
  title: string
  date: string
  showDate: boolean
  showEdit: boolean
  time_start: string
  category: string
  time_end: string
  full_day: number
  isEditAppointmentModalOpen: Signal<boolean> | null
  editModalData: IAppointment | null
}

export default component$((props: IProps) => {
  const updateLocalAppointment = $(() => {
    // TODO: // make this more beautiful
    if (!props.isEditAppointmentModalOpen) return
    if (!props.editModalData) return

    props.isEditAppointmentModalOpen.value = true
    props.editModalData.id = props.id
    props.editModalData.title = props.title
    props.editModalData.date = props.date
    props.editModalData.time_start = props.time_start
    props.editModalData.time_end = props.time_end
    props.editModalData.full_day = props.full_day
    props.editModalData.category = props.category
  })

  return (
    <>
      {props.showDate && (
        <div class="text-primary text-lg tracking-[0.2rem] font-semibold">
          {getFormattedDate(props.date)}
        </div>
      )}

      <div class="flex rounded-2xl gap-6 justify-between items-start w-full bg-primaryLight px-8 py-4 relative">
        <div class="gap-2 flex flex-col w-full">
          <div class="flex flex-col gap-1">
            <h3
              title={props.title}
              class="font-bold tracking-tight pb-2 text-text md:line-clamp-1 text-sm md:text-lg max-w-[95%]"
            >
              {props.title}
            </h3>
            <small
              title={props.category}
              class="text-text md:line-clamp-1 text-xs"
            >
              {props.category}
            </small>
            <h4 class="text-primary font-semibold"> {props.created_by} </h4>
          </div>

          <div class="text-sm text-text w-fit text-end text-nowrap">
            {props.full_day
              ? 'All day'
              : props.time_start.toString() + ' - ' + props.time_end.toString()}
          </div>
        </div>

        {props.showEdit ? (
          <button
            class="flex absolute right-4 top-4 border-[3px] transition-transform hover:scale-105 focus:scale-105 rounded-full border-primary p-1"
            onClick$={$(() => updateLocalAppointment())}
          >
            <IconManager icon="edit" classCustom="h-8 w-8" />
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
})
