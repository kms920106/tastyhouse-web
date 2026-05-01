import { Suspense } from 'react'
import BorderedSection from '@/components/ui/BorderedSection'
import FacilityContent from './FacilityContent'
import { FacilitySelectorSkeleton } from './FacilitySelectorSkeleton'

export default function FacilitySection() {
  return (
    <BorderedSection className="px-[15px] py-[30px]">
      <h2 className="mb-[15px] text-sm leading-[14px]">편의시설</h2>
      <Suspense fallback={<FacilitySelectorSkeleton />}>
        <FacilityContent />
      </Suspense>
    </BorderedSection>
  )
}
