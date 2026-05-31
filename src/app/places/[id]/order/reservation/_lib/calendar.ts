import { formatDate } from '@/lib/date'

export interface CalendarCell {
  date: string | null
  day: number | null
  weekday: number
  isPast: boolean
  isToday: boolean
}

export function formatYearMonth(year: number, month: number): string {
  const m = String(month + 1).padStart(2, '0')
  return `${year}. ${m}`
}

export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const cells: CalendarCell[] = []

  // 앞 패딩
  for (let i = 0; i < firstDay.getDay(); i++) {
    cells.push({ date: null, day: null, weekday: i, isPast: false, isToday: false })
  }

  // 해당 월 날짜
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateObj = new Date(year, month, d)
    cells.push({
      date: formatDate(dateObj, 'YYYY-MM-DD'),
      day: d,
      weekday: dateObj.getDay(),
      isPast: dateObj < today,
      isToday: dateObj.getTime() === today.getTime(),
    })
  }

  // 뒤 패딩 (7의 배수 맞춤)
  const remainder = cells.length % 7
  if (remainder !== 0) {
    const padCount = 7 - remainder
    for (let i = 0; i < padCount; i++) {
      cells.push({ date: null, day: null, weekday: (lastDay.getDay() + 1 + i) % 7, isPast: false, isToday: false })
    }
  }

  return cells
}

export function shiftMonth(
  ym: { year: number; month: number },
  delta: number,
): { year: number; month: number } {
  const date = new Date(ym.year, ym.month + delta, 1)
  return { year: date.getFullYear(), month: date.getMonth() }
}
