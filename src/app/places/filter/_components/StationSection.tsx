import BorderedSection from '@/components/ui/BorderedSection'
import { Suspense } from 'react'
import StationContent from './StationContent'
import { StationSelectorSkeleton } from './StationSelectorSkeleton'

export default function StationSection() {
  return (
    <BorderedSection className="px-[15px] py-5 border-t-0">
      <h2 className="mb-[15px] text-sm leading-[14px]">지하철역</h2>
      <Suspense fallback={<StationSelectorSkeleton />}>
        <StationContent />
      </Suspense>
    </BorderedSection>
  )
}
