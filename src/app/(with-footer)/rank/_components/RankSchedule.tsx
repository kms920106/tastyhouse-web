import { eventRepository } from "@/domains/event"
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'

export default async function RankSchedule() {
  // API 호출
  const { error, data } = await eventRepository.getRankEventDuration()

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <div>-</div>
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <div>-</div>
  }

  const rankEventInfo = data

  const timeDifference = getTimeDifference(rankEventInfo.endAt)
  const remainingTime = formatRemainingTime(timeDifference)

  const startDateFormatted = formatDate(rankEventInfo.startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(rankEventInfo.endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm leading-[14px] text-right">남은 기간 : {remainingTime}</p>
      <p className="text-sm leading-[14px] text-[#aaaaaa] text-right">({dateRange})</p>
    </div>
  )
}
