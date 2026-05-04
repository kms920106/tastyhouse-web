import { RankPeriod } from '@/domains/rank'
import MyRankFixedSection from './MyRankFixedSection'
import PrizeListSection from './PrizeListSection'
import RankHeader from './RankHeader'
import RankListSection from './RankListSection'

interface Props {
  rankPeriod: RankPeriod
}

export default function RankPage({ rankPeriod }: Props) {
  return (
    <>
      <RankHeader />
      <div className="flex flex-col flex-1 gap-2.5 bg-[#f9f9f9]">
        <PrizeListSection />
        <RankListSection rankPeriod={rankPeriod} />
        <MyRankFixedSection rankPeriod={rankPeriod} />
      </div>
    </>
  )
}
