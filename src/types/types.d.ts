export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface HelperText {
  error: boolean | null
  text: string | null
}

export interface IUser {
  id: number
  name: string
  password: string
}

export interface IAppointment {
  id: number
  title: string
  date: string
  time_start: string
  time_end: string
  full_day: number
  category: string
  visibility: string
  created_at?: string
  user_id?: number
  created_by?: number
}

export interface CalendarDay {
  day: number
  month: number
  year: number
  disabled: boolean
}
