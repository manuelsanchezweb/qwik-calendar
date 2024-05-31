import { component$ } from '@builder.io/qwik'
import { getFormattedDate } from '~/utils/functions'
import { IconManager } from '~/icons/icon-manager'

interface IProps {
  created_by: number | string
  title: string
  date: string
  showDate: boolean
  showEdit: boolean
  time_start: string
  time_end: string
  full_day: any
}

export default component$((props: IProps) => {
  return (
    <>
      {props.showDate && (
        <div class="text-primary text-2xl font-semibold">
          {getFormattedDate(props.date)}
        </div>
      )}

      <div class="flex rounded-2xl gap-6 justify-between items-center w-full bg-primaryLight px-8 py-6">
        <div class="gap-2 flex flex-col ">
          <div class="flex flex-col gap-1">
            <h3
              title={props.title}
              class="font-bold text-text line-clamp-1 text-lg"
            >
              {props.title}
            </h3>
            <h4 class="text-primary font-semibold"> {props.created_by} </h4>
          </div>

          <div class="text-xl text-text w-fit text-end text-nowrap">
            {props.full_day
              ? 'All day'
              : props.time_start.toString() + ' - ' + props.time_end.toString()}
          </div>
        </div>

        {props.showEdit ? (
          <button class="flex justify-end" onClick$={() => alert('Open modal')}>
            <IconManager icon="edit" classCustom="h-12 w-12" />
          </button>
        ) : (
          ''
        )}
      </div>
    </>
  )
})
