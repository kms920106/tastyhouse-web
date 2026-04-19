import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { RankPeriod } from '@/domains/rank'
import RankInfoModalButton from './RankInfoModalButton'
import RankPeriodTabs from './RankPeriodTabs'
import RankSchedule from './RankSchedule'

export function RankHeaderSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-3 p-0 bg-white">
            <Skeleton className="w-10 h-[18px]" />
            <Skeleton className="w-10 h-[18px]" />
          </div>
          <Skeleton className="w-[15px] h-[15px]" />
        </div>
        <Skeleton className="w-40 h-3.5" />
      </div>
      <Skeleton className="w-30 h-3.5 ml-auto" />
    </>
  )
}

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
