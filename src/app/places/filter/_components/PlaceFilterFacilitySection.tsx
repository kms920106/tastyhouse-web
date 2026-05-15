import { Suspense } from 'react'
import PlaceFilterFacilityContent from './PlaceFilterFacilityContent'
import { PlaceFilterFacilitySelectorSkeleton } from './PlaceFilterFacilitySelectorSkeleton'

export default function PlaceFilterFacilitySection() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <Suspense fallback={<PlaceFilterFacilitySelectorSkeleton />}>
        <PlaceFilterFacilityContent />
      </Suspense>
    </div>
  )
}
