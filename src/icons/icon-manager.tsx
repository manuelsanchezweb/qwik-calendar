import { component$ } from '@builder.io/qwik'
import {
  IconAdd,
  IconCalender,
  IconCalenderFill,
  IconChevronDown,
  IconEdit,
  IconGithub,
  IconHistory,
  IconHistoryFill,
  IconList,
  IconListFill,
  IconRemove,
  IconTimeEnd,
  IconTimeStart,
  IconUser,
} from './icons'

type IconType =
  | 'github'
  | 'user'
  | 'add'
  | 'remove'
  | 'edit'
  | 'calendar'
  | 'list'
  | 'calendar-fill'
  | 'list-fill'
  | 'arrow-left'
  | 'arrow-right'
  | 'history'
  | 'history-fill'
  | 'dropdown'
  | 'time-start'
  | 'time-end'

interface IconManagerProps {
  icon?: IconType
  classCustom?: string
}

export const IconManager = component$<IconManagerProps>(
  ({ icon, classCustom }) => {
    switch (icon) {
      case 'github':
        return <IconGithub classCustom={classCustom} />
      case 'user':
        return <IconUser classCustom={classCustom} />
      case 'list':
        return <IconList classCustom={classCustom} />
      case 'list-fill':
        return <IconListFill classCustom={classCustom} />
      case 'calendar':
        return <IconCalender classCustom={classCustom} />
      case 'calendar-fill':
        return <IconCalenderFill classCustom={classCustom} />
      case 'add':
        return <IconAdd classCustom={classCustom} />
      case 'edit':
        return <IconEdit classCustom={classCustom} />
      case 'remove':
        return <IconRemove classCustom={classCustom} />
      case 'history':
        return <IconHistory classCustom={classCustom} />
      case 'history-fill':
        return <IconHistoryFill classCustom={classCustom} />
      case 'dropdown':
        return <IconChevronDown classCustom={classCustom} />
      case 'time-start':
        return <IconTimeStart classCustom={classCustom} />
      case 'time-end':
        return <IconTimeEnd classCustom={classCustom} />
      default:
        return <IconAdd classCustom={classCustom} />
    }
  }
)
