import { Suspense } from 'react'
import PlaceFilterFacilityContent from './PlaceFilterFacilityContent'
import { FacilitySelectorSkeleton } from '../../../../components/places/FacilitySelectorSkeleton'

export default function PlaceFilterFacilitySection() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <Suspense fallback={<FacilitySelectorSkeleton />}>
        <PlaceFilterFacilityContent />
      </Suspense>
    </div>
  )
}
