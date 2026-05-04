import { RankPeriod } from '@/domains/rank'
import RankMyFixedSection from './RankMyFixedSection'
import RankPrizeSection from './RankPrizeSection'
import RankHeader from './RankHeader'
import RankMemberSection from './RankMemberSection'

interface Props {
  rankPeriod: RankPeriod
}

export default function RankPage({ rankPeriod }: Props) {
  return (
    <>
      <RankHeader />
      <div className="flex flex-col flex-1 gap-2.5 bg-[#f9f9f9]">
        <RankPrizeSection />
        <RankMemberSection rankPeriod={rankPeriod} />
        <RankMyFixedSection rankPeriod={rankPeriod} />
      </div>
    </>
  )
}
