import FetchErrorState from '@/components/ui/FetchErrorState'
import { RankMember, RankPeriod, rankPeriodToRankType } from '@/domains/rank'
import { rankRepository } from '@/domains/rank/rank.repository'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import RankItem from './RankItem'

export default async function RankList({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const { error, status, data } = await rankRepository.getRankMembers({
    type: rankPeriodToRankType(rankPeriod),
    limit: 100,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('랭킹')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.length === 0) {
    return (
      <div className="w-full text-sm leading-[14px] text-[#999999] text-center whitespace-pre-line">
        랭킹 데이터가 없습니다.
      </div>
    )
  }

  return data.map((item: RankMember) => (
    <Link key={item.memberId} href={PAGE_PATHS.MEMBER_DETAIL(item.memberId)}>
      <div className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]">
        <RankItem
          rankNo={item.rankNo}
          profileImageUrl={item.profileImageUrl}
          nickname={item.nickname}
          grade={item.grade}
          reviewCount={item.reviewCount}
        />
      </div>
    </Link>
  ))
}
