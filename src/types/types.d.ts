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
  createdBy: number
  createdAt: string
}

export interface DayStore{
  day: string;
}