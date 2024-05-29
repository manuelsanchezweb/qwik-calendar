import type { Day, Month } from '~/types/types'
import { version } from '../../package.json'

export const APP_VERSION = version

export const months: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const days: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const VIEWS = {
  CALENDAR: 'CALENDAR',
  LIST: 'LIST',
} as const

export type ViewsType = typeof VIEWS
export type ViewKeys = ViewsType[keyof ViewsType]
