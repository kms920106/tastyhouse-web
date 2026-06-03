/**
 * Represents the difference between two points in time.
 */
export interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMilliseconds: number
}

/**
 * Calculates the time difference between now and a given end date.
 * @param end The future date (string or Date object).
 * @returns A TimeDifference object.
 */
export function getTimeDifference(end: string | Date): TimeDifference {
  const endDate = new Date(end)
  const now = new Date()

  // Ensure the difference is not negative
  const totalMilliseconds = Math.max(0, endDate.getTime() - now.getTime())

  const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, totalMilliseconds }
}

/**
 * Supported date format types.
 */
export type DateFormat =
  | 'YYYY.MM.DD'
  | 'YY.MM.DD'
  | 'MM.DD'
  | 'YYYY-MM-DD'
  | 'MM-DD'
  | 'YYYY년 M월 D일'
  | 'YYYY-MM-DD HH:mm'
  | 'HH:mm'

/**
 * Represents parsed date components.
 */
interface DateComponents {
  year: number
  yearShort: string
  month: string
  monthWithoutZero: string
  day: string
  dayWithoutZero: string
  hour: string
  minute: string
}

/**
 * Extracts date components from a Date object.
 */
function extractDateComponents(date: Date): DateComponents {
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date provided to formatDate')
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return {
    year,
    yearShort: String(year).slice(-2),
    month,
    monthWithoutZero: month.replace(/^0/, ''),
    day,
    dayWithoutZero: day.replace(/^0/, ''),
    hour,
    minute,
  }
}

/**
 * Format formatter functions map.
 */
const formatFormatters: Record<DateFormat, (components: DateComponents) => string> = {
  'YYYY.MM.DD': ({ year, month, day }) => `${year}.${month}.${day}`,
  'YY.MM.DD': ({ yearShort, month, day }) => `${yearShort}.${month}.${day}`,
  'MM.DD': ({ month, day }) => `${month}.${day}`,
  'YYYY-MM-DD': ({ year, month, day }) => `${year}-${month}-${day}`,
  'MM-DD': ({ month, day }) => `${month}-${day}`,
  'YYYY년 M월 D일': ({ year, monthWithoutZero, dayWithoutZero }) =>
    `${year}년 ${monthWithoutZero}월 ${dayWithoutZero}일`,
  'YYYY-MM-DD HH:mm': ({ year, month, day, hour, minute }) =>
    `${year}-${month}-${day} ${hour}:${minute}`,
  'HH:mm': ({ hour, minute }) => `${hour}:${minute}`,
}

/**
 * Formats a date according to the specified format string.
 * @param date - The date to format (string or Date object).
 * @param format - The desired format type.
 * @returns A formatted date string.
 * @throws Error if the date is invalid.
 */
export function formatDate(date: string | Date, format: DateFormat): string {
  const dateObj = new Date(date)
  const components = extractDateComponents(dateObj)
  const formatter = formatFormatters[format]

  return formatter(components)
}

/**
 * Formats a TimeDifference object into a string like "X일 Y시간 Z분".
 * Only displays non-zero parts, up to the minute.
 * @param diff The TimeDifference object.
 * @returns A formatted string.
 */
export function formatRemainingTime(diff: TimeDifference): string {
  const parts = []
  if (diff.days > 0) {
    parts.push(`${diff.days}일`)
  }
  if (diff.hours > 0) {
    parts.push(`${diff.hours}시간`)
  }
  if (diff.minutes > 0) {
    parts.push(`${diff.minutes}분`)
  }

  if (parts.length === 0) {
    // If less than a minute, show "0분" or "방금"
    return '0분'
  }

  return parts.join(' ')
}

/**
 * A simple utility to get only the remaining days, for components that don't need detailed time.
 * @param end The future date (string or Date object).
 * @returns The number of full days remaining.
 */
export function getRemainingDays(end: string | Date): number {
  return getTimeDifference(end).days
}

/**
 * Korean weekday labels indexed by Date.getDay() (0 = Sunday).
 */
const KOREAN_WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

/**
 * Formats a reservation date/time and party size into a single summary line.
 * e.g. "07.01(수) · 오후 12:00 · 2명"
 * @param date The reservation date (string or Date object).
 * @param partySize The number of people for the reservation.
 * @returns A formatted single-line summary string.
 */
export function formatReservationSummary(date: string | Date, partySize: number): string {
  const dateObj = new Date(date)
  const { month, day, hour, minute } = extractDateComponents(dateObj)

  const weekday = KOREAN_WEEKDAYS[dateObj.getDay()]

  const hour24 = Number(hour)
  const meridiem = hour24 < 12 ? '오전' : '오후'
  const hour12 = String(hour24 % 12 || 12).padStart(2, '0')

  return `${month}.${day}(${weekday}) · ${meridiem} ${hour12}:${minute} · ${partySize}명`
}

/**
 * Formats a date as a relative time string (e.g., "방금 전", "5분 전", "3시간 전").
 * @param date The past date (string or Date object).
 * @returns A formatted relative time string in Korean.
 */
export function formatTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffInMs = now.getTime() - past.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return '방금 전'
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInDays < 7) return `${diffInDays}일 전`

  return past.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
}
