import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankMemberList from './RankMemberList'
import { RankMemberListSkeleton } from './RankMemberListSkeleton'

export default function RankMemberListSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<RankMemberListSkeleton />}>
        <RankMemberList rankPeriod={rankPeriod} />
      </Suspense>
      <div className="h-[116px]"></div>
    </div>
  )
}
