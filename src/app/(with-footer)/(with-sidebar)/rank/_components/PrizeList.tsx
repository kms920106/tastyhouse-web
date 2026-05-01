import FetchErrorState from '@/components/ui/FetchErrorState'
import { eventRepository } from '@/domains/event/event.repository'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import Image from 'next/image'

export default async function PrizeList() {
  const { error, status, data } = await eventRepository.getEventRankPrizes()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('경품')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const prizes = data

  if (prizes.length === 0) {
    return <div className="w-full py-10 text-[#999999] text-center">경품 데이터가 없습니다.</div>
  }

  return prizes.map((prize) => (
    <div key={prize.id} className="flex flex-col flex-1 items-center min-w-0">
      <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
        <div className="absolute top-0 left-0 z-10 w-[25%]">
          <Image
            src={`/images/rank/icon-rank-0${prize.prizeRank}.png`}
            alt={`${prize.prizeRank}등`}
            width={70}
            height={70}
            className="w-full h-auto"
          />
        </div>
        <div className="flex items-center justify-center w-full h-full bg-white border border-[#eeeeee] rounded-full">
          <Image
            src={prize.imageUrl}
            alt={prize.name}
            width={80}
            height={80}
            className="w-[55%] h-auto"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full text-center">
        <p className="text-[11px] leading-[11px] truncate">{prize.brand}</p>
        <p className="text-[11px] leading-[11px] truncate">{prize.name}</p>
      </div>
    </div>
  ))
}
