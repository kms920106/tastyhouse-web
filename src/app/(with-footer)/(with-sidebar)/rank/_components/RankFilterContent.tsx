import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankFilter from './RankFilter'
import { RankFilterSkeleton } from './RankFilterSkeleton'

export default function RankFilterContent({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <div className="flex justify-between">
      <Suspense fallback={<RankFilterSkeleton />}>
        <RankFilter rankPeriod={rankPeriod} />
      </Suspense>
    </div>
  )
}
