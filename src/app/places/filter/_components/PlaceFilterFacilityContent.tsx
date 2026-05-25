import { FacilitySelectorSkeleton } from '@/components/places/FacilitySelectorSkeleton'
import { Suspense } from 'react'
import PlaceFilterFacilitySelectorFetcher from './PlaceFilterFacilitySelectorFetcher'

export default function PlaceFilterFacilityContent() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <Suspense fallback={<FacilitySelectorSkeleton />}>
        <PlaceFilterFacilitySelectorFetcher />
      </Suspense>
    </div>
  )
}
