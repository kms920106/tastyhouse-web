import { FacilityItemSkeleton } from '@/components/places/FacilityItemSkeleton'
import { PlaceFilterFacilitySelectorLayout } from './PlaceFilterFacilitySelector'

export function PlaceFilterFacilitySelectorSkeleton() {
  return (
    <PlaceFilterFacilitySelectorLayout>
      {Array.from({ length: 8 }).map((_, i) => (
        <FacilityItemSkeleton key={i} />
      ))}
    </PlaceFilterFacilitySelectorLayout>
  )
}
