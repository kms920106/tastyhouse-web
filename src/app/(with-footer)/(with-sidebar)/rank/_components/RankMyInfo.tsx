import FetchErrorState from '@/components/ui/FetchErrorState'
import { RankPeriod, RankType } from '@/domains/rank'
import { rankRepository } from '@/domains/rank/rank.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import RankMemberInfo from './RankMemberInfo'

const RANK_PERIOD_TO_TYPE: Record<RankPeriod, RankType> = {
  all: 'ALL',
  monthly: 'MONTHLY',
}

export default async function RankMyInfo({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const { error, status, data } = await rankRepository.getRankMembersMe({
    type: RANK_PERIOD_TO_TYPE[rankPeriod],
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('내 랭킹')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const { nickname, profileImageUrl, reviewCount, rankNo, grade } = data

  return (
    <RankMemberInfo
      rankNo={rankNo}
      profileImageUrl={profileImageUrl}
      nickname={nickname}
      grade={grade}
      reviewCount={reviewCount}
      isMe
    />
  )
}
