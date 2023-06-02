import { component$ } from '@builder.io/qwik'
import { IconGithub, IconUser } from './icons'

type IconType =
  | 'github'
  | 'user'
  | 'add'
  | 'remove'
  | 'edit'
  | 'calendar'
  | 'list'
  | 'arrow-left'
  | 'arrow-right'

interface IconManagerProps {
  icon: IconType
}

export const IconManager = component$<IconManagerProps>(({ icon }) => {
  switch (icon) {
    case 'github':
      return <IconGithub />
    case 'user':
      return <IconUser />
    default:
      return <IconGithub />
  }
})
