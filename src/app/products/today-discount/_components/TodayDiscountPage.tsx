import { Suspense } from 'react'
import TodayDiscountHeader from './TodayDiscountHeader'
import TodayDiscountListClient from './TodayDiscountListClient'
import TodayDiscountListSkeleton from './TodayDiscountListSkeleton'

export default function TodayDiscountPage() {
  return (
    <>
      <TodayDiscountHeader />
      <Suspense fallback={<TodayDiscountListSkeleton viewType="list" />}>
        <TodayDiscountListClient />
      </Suspense>
    </>
  )
}
