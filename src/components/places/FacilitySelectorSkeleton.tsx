import { FacilityItemSkeleton } from '@/components/places/FacilityItemSkeleton'
import { FacilitySelectorLayout } from '@/components/places/FacilitySelectorLayout'

export function FacilitySelectorSkeleton() {
  return (
    <FacilitySelectorLayout>
      {Array.from({ length: 8 }).map((_, i) => (
        <FacilityItemSkeleton key={i} />
      ))}
    </FacilitySelectorLayout>
  )
}
