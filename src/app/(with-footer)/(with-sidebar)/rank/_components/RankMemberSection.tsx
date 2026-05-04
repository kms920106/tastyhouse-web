import { RankPeriod } from '@/domains/rank'
import RankFilterContent from './RankFilterContent'
import RankMemberContent from './RankMemberContent'

export default function RankMemberSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="flex flex-col flex-1 px-4 pt-5 bg-white">
      <RankFilterContent rankPeriod={rankPeriod} />
      <RankMemberContent rankPeriod={rankPeriod} />
    </section>
  )
}
