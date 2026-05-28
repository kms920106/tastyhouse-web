import { Suspense } from 'react'
import TodayDiscountHeader from './TodayDiscountHeader'
import TodayDiscountContent from './TodayDiscountContent'
import TodayDiscountListSkeleton from './TodayDiscountListSkeleton'

export default function TodayDiscountPage() {
  return (
    <>
      <TodayDiscountHeader />
      <Suspense fallback={<TodayDiscountListSkeleton viewType="list" />}>
        <TodayDiscountContent />
      </Suspense>
    </>
  )
}
