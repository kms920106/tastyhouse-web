import FetchErrorState from '@/components/ui/FetchErrorState'
import { RankPeriod, rankPeriodToRankType, rankRepository } from '@/domains/rank'
import { getIsLoggedIn } from '@/lib/auth-config'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import RankItem from './RankItem'

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
    type: rankPeriodToRankType(rankPeriod),
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('내 랭킹')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
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
