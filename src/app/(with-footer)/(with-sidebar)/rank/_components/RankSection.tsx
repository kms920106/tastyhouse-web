import { RankPeriod } from '@/domains/rank'
import RankHeaderSection from './RankHeaderSection'
import RankListSection from './RankListSection'

export default function RankSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="px-4 py-5 bg-white">
      <RankHeaderSection rankPeriod={rankPeriod} />
      <RankListSection rankPeriod={rankPeriod} />
    </section>
  )
}
