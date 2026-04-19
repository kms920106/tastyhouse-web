import { Suspense } from 'react'
import PrizeList, { PrizeListSkeleton } from './PrizeList'

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
