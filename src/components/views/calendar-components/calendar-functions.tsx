import type { CalendarDay } from "~/types/types"

/**
 *
 * @param date the date to get the start day of the week for
 * @returns a number representing the day of the week, where Monday=0, ..., Sunday=6
 */
export function getStartDay(date: Date) {
  const startDay = date.getDay()
  return startDay === 0 ? 6 : startDay - 1 // make Monday=0, ..., Sunday=6
}

/**
 *
 * @param date the date to get the number of days in the month for
 * @returns number of days in the month
 */
export function getNumDaysInMonth(date: Date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  nextMonth.setDate(nextMonth.getDate() - 1)
  return nextMonth.getDate()
}

/**
 *
 * @param month The month index, where January=0, ..., December=11
 * @param year The year of the month
 * @returns Number of days in the last month
 */
export function getDaysInLastMonth(month: number, year: number): number {
  return month === 0
    ? new Date(year - 1, 12, 0).getDate() // December of the previous year has index 11
    : new Date(year, month, 0).getDate()
}

/**
 *
 * @param month The month index, where January=0, ..., December=11
 * @param year The year of the month
 * @returns the month name and year, e.g. "January 2023"
 */
export function getMonthName(month: number, year: number) {
  const date = new Date(year, month)
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date)
}

/**
 * Returns an array of CalendarDay objects representing the days of the previous month.
 * @param startDay The starting day of the current month.
 * @param numDaysLastMonth The number of days in the last month.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 * @returns An array of CalendarDay objects representing the days of the last month.
 */
export function getDaysOfLastMonth(
  startDay: number,
  numDaysLastMonth: number,
  month: number,
  year: number
): CalendarDay[] {
  const days: CalendarDay[] = []
  const previousMonth = month === 0 ? 11 : month - 1 // Adjust the month index here. December has index 11 and it is the previous month of January
  const previousYear = month === 0 ? year - 1 : year // Adjust the year here

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: numDaysLastMonth - startDay + i + 1,
      month: previousMonth,
      year: previousYear,
      disabled: true,
    })
  }
  return days
}

/**
 * Returns an array of CalendarDay objects representing the days of the current month.
 * @param numDays The number of days in the current month.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 * @returns An array of CalendarDay objects representing the days of the current month.
 */
export function getDaysOfCurrentMonth(
  numDays: number,
  month: number,
  year: number
): CalendarDay[] {
  const days: CalendarDay[] = []
  for (let i = 1; i <= numDays; i++) {
    days.push({
      day: i,
      month,
      year,
      disabled: false,
    })
  }
  return days
}

/**
 * Updates the provided calendar array with the days of the next month.
 * @param calendar The calendar array to be updated.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 */
export function getDaysOfNextMonth(
  calendar: CalendarDay[],
  month: number,
  year: number
): void {
  let nextMonthDay = 1
  while (calendar.length % 7 !== 0) {
    calendar.push({
      day: nextMonthDay++,
      month: month === 11 ? 0 : month + 1,
      year: month === 11 ? year + 1 : year,
      disabled: true,
    })
  }
}

/**
 * Builds the calendar for a given date.
 * @param date The date for which to build the calendar.
 * @returns An array representing the weeks in the calendar.
 */
export function buildCalendar(date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const calendar: CalendarDay[] = []

  const startDay = getStartDay(new Date(date.getFullYear(), date.getMonth(), 1))
  const numDays = getNumDaysInMonth(date)
  const numDaysLastMonth = getDaysInLastMonth(month, year)

  calendar.push(...getDaysOfLastMonth(startDay, numDaysLastMonth, month, year))
  calendar.push(...getDaysOfCurrentMonth(numDays, month, year))
  getDaysOfNextMonth(calendar, month, year)

  const weeks = []
  while (calendar.length) {
    weeks.push(calendar.splice(0, 7))
  }

  return weeks
}