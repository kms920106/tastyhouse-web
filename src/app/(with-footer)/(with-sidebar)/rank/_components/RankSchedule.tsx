import { rankRepository } from '@/domains/rank/rank.repository'
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'

export default async function RankSchedule() {
  const { error, data } = await rankRepository.getRankDuration()

  if (error) {
    return <div>-</div>
  }

  if (!data) {
    return <div>-</div>
  }

  const { startAt, endAt } = data

  const timeDifference = getTimeDifference(endAt)
  const remainingTime = formatRemainingTime(timeDifference)

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
