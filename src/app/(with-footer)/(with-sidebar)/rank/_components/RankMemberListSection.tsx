import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankMemberList from './RankMemberList'
import { RankMemberListSkeleton } from './RankMemberListSkeleton'

export default function RankMemberListSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="flex flex-col gap-2.5 pt-[25px]">
      <Suspense fallback={<RankMemberListSkeleton />}>
        <RankMemberList rankPeriod={rankPeriod} />
      </Suspense>
    </section>
  )
}
