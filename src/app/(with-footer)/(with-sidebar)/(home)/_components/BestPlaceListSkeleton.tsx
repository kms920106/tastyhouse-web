import { PlaceCardSkeleton } from '@/components/places/PlaceCard'

export function BestPlaceListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-[25px]">
      {[...Array(4)].map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}
