import FetchErrorState from '@/components/ui/FetchErrorState'
import { RankPeriod, RankType } from '@/domains/rank'
import { rankRepository } from '@/domains/rank/rank.repository'
import { getIsLoggedIn } from '@/lib/auth-config'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import RankItem from './RankItem'

const RANK_PERIOD_TO_TYPE: Record<RankPeriod, RankType> = {
  all: 'ALL',
  monthly: 'MONTHLY',
}

export default async function MyRankInfo({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const isLoggedIn = await getIsLoggedIn()

  if (!isLoggedIn) {
    return (
      <div className="w-full text-sm leading-[14px] text-[#999999] text-center whitespace-pre-line">
        로그인 후 이용할 수 있어요
      </div>
    )
  }

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
    <RankItem
      rankNo={rankNo}
      profileImageUrl={profileImageUrl}
      nickname={nickname}
      grade={grade}
      reviewCount={reviewCount}
      isMe
    />
  )
}
