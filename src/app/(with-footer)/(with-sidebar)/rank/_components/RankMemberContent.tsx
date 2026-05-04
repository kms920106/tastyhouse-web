import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankMemberList from './RankMemberList'
import { RankMemberListSkeleton } from './RankMemberListSkeleton'

export default function RankMemberContent({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col flex-1 gap-2.5 py-[25px]">
        <Suspense fallback={<RankMemberListSkeleton />}>
          <RankMemberList rankPeriod={rankPeriod} />
        </Suspense>
      </div>
      <div className="h-[142px]"></div>
    </div>
  )
}
