import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'

export default function SearchResultsSkeleton() {
  return (
    <div className="px-[15px] py-[30px]">
      <ul className="grid grid-cols-2 gap-x-[15px] gap-y-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i}>
            <PlaceCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
