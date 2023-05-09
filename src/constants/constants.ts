import type { Day, Month } from '~/types/types'

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

export const KEYS = {
  SUPABASE_PUBLIC_URL: import.meta.env.PUBLIC_SUPABASE_URL,
  SUPABASE_PUBLIC_ANON_KEY: import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
}
