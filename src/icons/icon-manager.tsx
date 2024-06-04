import { component$ } from '@builder.io/qwik'
import {
  IconAdd,
  IconCalender,
  IconCalenderFill,
  IconEdit,
  IconGithub,
  IconHistory,
  IconHistoryFill,
  IconList,
  IconListFill,
  IconRemove,
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
      default:
        return <IconAdd classCustom={classCustom} />
    }
  }
)
