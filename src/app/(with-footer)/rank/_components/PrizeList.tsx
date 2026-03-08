import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { eventRepository } from '@/domains/event'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { resolveImageUrl } from '@/lib/image'
import Image from 'next/image'

export function PrizeListSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <PrizeListItemSkeleton key={i} />
      ))}
    </>
  )
}

function PrizeListItemSkeleton() {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
        <Skeleton className="w-full h-full flex items-center justify-center border border-[#eeeeee] rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-1 w-full text-center">
        <Skeleton className="w-14 h-[11px]" />
        <Skeleton className="w-20 h-[11px]" />
      </div>
    </div>
  )
}

export default async function PrizeList() {
  // API 호출
  const { error, data } = await eventRepository.getRankEventPrizes()

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10" />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('경품')} className="py-10" />
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
            src={resolveImageUrl(prize.imageUrl)}
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
