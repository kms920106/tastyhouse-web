import { RankPeriod } from '@/domains/rank'
import RankFilterSection from './RankFilterSection'
import RankMemberListSection from './RankMemberListSection'

export default function RankListSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="flex flex-col flex-1 px-4 pt-5 bg-white">
      <RankFilterSection rankPeriod={rankPeriod} />
      <RankMemberListSection rankPeriod={rankPeriod} />
    </section>
  )
}
