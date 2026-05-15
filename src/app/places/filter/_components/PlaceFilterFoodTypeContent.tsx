import { Suspense } from 'react'
import PlaceFilterFoodTypeSelectorFetcher from './PlaceFilterFoodTypeSelectorFetcher'
import { PlaceFilterFoodTypeSelectorSkeleton } from './PlaceFilterFoodTypeSelectorSkeleton'

export default function PlaceFilterFoodTypeContent() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">음식 종류</h2>
      <Suspense fallback={<PlaceFilterFoodTypeSelectorSkeleton />}>
        <PlaceFilterFoodTypeSelectorFetcher />
      </Suspense>
    </div>
  )
}
