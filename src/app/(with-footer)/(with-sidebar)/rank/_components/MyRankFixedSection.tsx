import { RankPeriod } from '@/domains/rank'
import { Suspense } from 'react'
import MyRankInfo, { MyRankInfoSkeleton } from './MyRankInfo'

export default function MyRankFixedSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  return (
    <section className="fixed left-0 right-0 bottom-[72px] w-full">
      <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#cccccc] box-border rounded-[2.5px]">
        <Suspense fallback={<MyRankInfoSkeleton />}>
          <MyRankInfo rankPeriod={rankPeriod} />
        </Suspense>
      </div>
    </section>
  )
}
