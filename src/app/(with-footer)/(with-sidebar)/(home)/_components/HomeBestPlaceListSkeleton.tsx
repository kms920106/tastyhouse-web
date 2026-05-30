import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'

export function HomeBestPlaceListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-[15px] gap-y-10 mb-10">
      {[...Array(4)].map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}
