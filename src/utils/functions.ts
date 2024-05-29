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
