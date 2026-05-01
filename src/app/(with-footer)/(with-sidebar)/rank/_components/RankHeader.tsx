import { RankPeriod } from '@/domains/rank'
import RankInfoModalButton from './RankInfoModalButton'
import RankPeriodTabs from './RankPeriodTabs'
import RankSchedule from './RankSchedule'

export default async function RankHeader({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2.5">
        <RankPeriodTabs initialTab={rankPeriod} />
        <RankInfoModalButton />
      </div>
      <RankSchedule />
    </div>
  )
}
