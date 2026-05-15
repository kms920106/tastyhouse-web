import { Suspense } from 'react'
import PlaceFilterStationSelectorFetcher from './PlaceFilterStationSelectorFetcher'
import { PlaceFilterStationSelectorSkeleton } from './PlaceFilterStationSelectorSkeleton'

export default function PlaceFilterStationContent() {
  return (
    <div className="px-[15px] py-5">
      <h2 className="mb-[15px] text-sm leading-[14px]">지하철역</h2>
      <Suspense fallback={<PlaceFilterStationSelectorSkeleton />}>
        <PlaceFilterStationSelectorFetcher />
      </Suspense>
    </div>
  )
}
