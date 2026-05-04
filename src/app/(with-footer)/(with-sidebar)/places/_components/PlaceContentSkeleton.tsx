import { PlaceCardSkeleton } from '@/components/places/PlaceCardSkeleton'
import PlaceFilterBar from './PlaceFilterBar'

export function PlaceContentSkeleton() {
  return (
    <div className="min-h-screen px-[15px] py-[30px] pb-[90px]">
      <PlaceFilterBar totalCount={0} isLoading />
      <ul className="mt-5 grid grid-cols-2 gap-x-[15px] gap-y-10">
        {[...Array(4)].map((_, i) => (
          <li key={i}>
            <PlaceCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  )
}
