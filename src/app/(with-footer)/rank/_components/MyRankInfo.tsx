import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { RankPeriod, rankPeriodToRankType, rankService } from '@/domains/rank'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { cookies } from 'next/headers'
import RankItem from './RankItem'

export function MyRankInfoSkeleton() {
  return (
    <>
      <div className="flex gap-2.5">
        <div className="flex items-center flex-shrink-0 w-[22px]">
          <Skeleton className="w-4 h-3" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <Skeleton className="w-30 h-5" />
          <div className="flex items-center gap-[5px]">
            <Skeleton className="w-5 h-4" />
            <Skeleton className="w-15 h-3" />
          </div>
        </div>
      </div>
      <Skeleton className="w-10 h-3" />
    </>
  )
}

export default async function MyRankInfo({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  if (!accessToken) {
    return (
      <div className="w-full text-sm leading-[14px] text-[#999999] text-center whitespace-pre-line">
        로그인 후 이용할 수 있어요
      </div>
    )
  }

  // API 호출
  const params = {
    type: rankPeriodToRankType(rankPeriod),
  }
  const { error, data } = await rankService.getRankMembersMe(params)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('내 랭킹')} />
  }

  const info = data

  return (
    <RankItem
      rankNo={info.rankNo}
      profileImageUrl={info.profileImageUrl}
      nickname={info.nickname}
      grade={info.grade}
      reviewCount={info.reviewCount}
      isMe
    />
  )
}
