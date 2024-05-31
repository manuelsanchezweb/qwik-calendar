import { type IUser } from '~/types/types'

export function getCurrentMonthAndYear() {
  const months = [
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
  const date = new Date()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${month} ${year}`
}

export function getDayName() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayName = days[new Date().getDay()]
  return dayName
}

export function getCurrentDay() {
  const day = new Date().getDate()
  return day < 10 ? `0${day}` : day
}

export const getFormattedDate = (dateStr: string) => {
  const date = new Date(dateStr)

  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()

  const formattedDay = day.toString().padStart(2, '0')
  const formattedMonth = month.toString().padStart(2, '0')

  return `${formattedDay}.${formattedMonth}.${year}`
}

/**
 * Helper function to parse time string into a Date object.
 * @param time - A string representing time in "HH:MM" format.
 * @returns A Date object with the time set accordingly.
 */
export const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

export const getAuthorByTaskId = (id: number, userList: IUser[]) => {
  const author = userList.find((user) => user.id === id)
  return author ? author.name : 'Unknown'
}
