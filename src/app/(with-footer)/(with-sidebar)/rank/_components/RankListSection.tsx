import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankList from './RankList'
import { RankListSkeleton } from './RankListSkeleton'

export default function RankListSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="flex flex-col gap-2.5 pt-[25px]">
      <Suspense fallback={<RankListSkeleton />}>
        <RankList rankPeriod={rankPeriod} />
      </Suspense>
    </section>
  )
}
