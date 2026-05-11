import { RankPeriod } from '@/domains/rank'
import { rankRepository } from '@/domains/rank/rank.repository'
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'

function getMonthlySchedule() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const startAt = new Date(year, month, 1)
  const endAt = new Date(year, month + 1, 0, 23, 59, 59)
  return { startAt, endAt }
}

export default async function RankSchedule({ rankPeriod }: { rankPeriod: RankPeriod }) {
  if (rankPeriod === 'monthly') {
    const { startAt, endAt } = getMonthlySchedule()
    const remainingTime = formatRemainingTime(getTimeDifference(endAt))
    const startDateFormatted = formatDate(startAt, 'YYYY.MM.DD')
    const endDateFormatted = formatDate(endAt, 'MM.DD')
    const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

    return (
      <div className="flex flex-col gap-1.5">
        <p className="text-sm leading-[14px] text-right">남은 기간 : {remainingTime}</p>
        <p className="text-sm leading-[14px] text-[#aaaaaa] text-right">({dateRange})</p>
      </div>
    )
  }

  const { error, data } = await rankRepository.getRankDuration()

  if (error || !data) {
    return <div>-</div>
  }

  const { startAt, endAt } = data
  const remainingTime = formatRemainingTime(getTimeDifference(endAt))
  const startDateFormatted = formatDate(startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm leading-[14px] text-right">남은 기간 : {remainingTime}</p>
      <p className="text-sm leading-[14px] text-[#aaaaaa] text-right">({dateRange})</p>
    </div>
  )
}
