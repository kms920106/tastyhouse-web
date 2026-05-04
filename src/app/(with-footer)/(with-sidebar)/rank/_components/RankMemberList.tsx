import EmptyState from '@/app/(with-footer)/(without-sidebar)/mypage/_components/EmptyState'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { RankPeriod, RankType } from '@/domains/rank'
import { rankRepository } from '@/domains/rank/rank.repository'
import RankMemberListItem from './RankMemberListItem'

const RANK_PERIOD_TO_TYPE: Record<RankPeriod, RankType> = {
  all: 'ALL',
  monthly: 'MONTHLY',
}

export default async function RankMemberList({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const { error, status, data } = await rankRepository.getRankMembers({
    type: RANK_PERIOD_TO_TYPE[rankPeriod],
    limit: 100,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('랭킹')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.length === 0) {
    return <EmptyState message="랭킹 데이터가 없습니다." />
  }
  return data.map((rankMember) => (
    <RankMemberListItem key={rankMember.memberId} rankMember={rankMember} />
  ))
}
