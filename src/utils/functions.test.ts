import { test, expect } from '@playwright/test'
import { getCurrentMonthAndYear, getDayName, getCurrentDay } from './functions'

test.describe('Date Functions Tests', () => {
  test('getCurrentMonthAndYear should return the correct month and year', async () => {
    const result = getCurrentMonthAndYear()
    expect(result).toBe('May 2024')
  })

  test('getDayName should return the correct day name', async () => {
    const result = getDayName()
    expect(result).toBe('Wednesday')
  })

  test('getCurrentDay should return the correct day', async () => {
    const result = getCurrentDay()
    expect(result).toBe(29)
  })
})
