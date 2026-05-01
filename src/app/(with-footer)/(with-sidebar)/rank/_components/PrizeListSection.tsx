import { Suspense } from 'react'
import PrizeList from './PrizeList'
import { PrizeListSkeleton } from './PrizeListSkeleton'

export default function PrizeListSection() {
  return (
    <section className="px-7 py-[30px] bg-white">
      <div className="flex justify-between items-end gap-2">
        <Suspense fallback={<PrizeListSkeleton />}>
          <PrizeList />
        </Suspense>
      </div>
    </section>
  )
}
