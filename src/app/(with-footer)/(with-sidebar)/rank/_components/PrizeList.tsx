import FetchErrorState from '@/components/ui/FetchErrorState'
import { rankRepository } from '@/domains/rank/rank.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import PrizeListItem from './PrizeListItem'

export default async function PrizeList() {
  const { error, status, data } = await rankRepository.getRankPrizes()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('경품')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.length === 0) {
    return <div className="w-full py-10 text-[#999999] text-center">경품 데이터가 없습니다.</div>
  }

  return data.map((prize) => <PrizeListItem key={prize.id} prize={prize} />)
}
