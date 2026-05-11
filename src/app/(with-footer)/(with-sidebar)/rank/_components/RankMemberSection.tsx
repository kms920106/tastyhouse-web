import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import RankInfoModalButton from './RankInfoModalButton'
import RankMemberList from './RankMemberList'
import { RankMemberListSkeleton } from './RankMemberListSkeleton'
import RankMemberTabs from './RankMemberTabs'
import RankSchedule from './RankSchedule'
import { RankScheduleSkeleton } from './RankScheduleSkeleton'

export default function RankMemberSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="flex flex-col flex-1 px-4 pt-5 bg-white">
      <RankMemberTabs
        initialTab={rankPeriod}
        infoButton={<RankInfoModalButton />}
        scheduleArea={
          <Suspense fallback={<RankScheduleSkeleton />}>
            <RankSchedule rankPeriod={rankPeriod} />
          </Suspense>
        }
        allContent={
          <Suspense fallback={<RankMemberListSkeleton />}>
            <RankMemberList rankPeriod="all" />
          </Suspense>
        }
        monthlyContent={
          <Suspense fallback={<RankMemberListSkeleton />}>
            <RankMemberList rankPeriod="monthly" />
          </Suspense>
        }
      />
    </section>
  )
}
