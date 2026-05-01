import { FacilityItemSkeleton } from '@/components/places/FacilityItemSkeleton'
import { FacilitySelectorLayout } from './FacilitySelector'

export function FacilitySelectorSkeleton() {
  return (
    <FacilitySelectorLayout>
      {Array.from({ length: 8 }).map((_, i) => (
        <FacilityItemSkeleton key={i} />
      ))}
    </FacilitySelectorLayout>
  )
}
