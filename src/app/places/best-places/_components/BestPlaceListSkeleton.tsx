import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'

export default function BestPlaceListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-[15px] gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}
