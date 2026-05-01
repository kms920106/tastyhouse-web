import { Suspense } from 'react'
import BorderedSection from '@/components/ui/BorderedSection'
import FoodTypeContent from './FoodTypeContent'
import { FoodTypeSelectorSkeleton } from './FoodTypeSelectorSkeleton'

export default function FoodTypeSection() {
  return (
    <BorderedSection className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">음식 종류</h2>
      <Suspense fallback={<FoodTypeSelectorSkeleton />}>
        <FoodTypeContent />
      </Suspense>
    </BorderedSection>
  )
}
