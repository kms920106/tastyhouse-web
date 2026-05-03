import { RankPeriod } from '@/domains/rank'
import RankHeaderSection from './RankHeaderSection'
import RankMemberListSection from './RankMemberListSection'

export default function RankSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="px-4 py-5 bg-white">
      <RankHeaderSection rankPeriod={rankPeriod} />
      <RankMemberListSection rankPeriod={rankPeriod} />
    </section>
  )
}
