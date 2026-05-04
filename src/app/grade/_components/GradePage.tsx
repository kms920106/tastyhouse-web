import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import GradeCurrentSection from './GradeCurrentSection'
import GradeCurrentSectionSkeleton from './GradeCurrentSectionSkeleton'
import GradeHeader from './GradeHeader'
import GradeInfoSection from './GradeInfoSection'
import GradeInfoSectionSkeleton from './GradeInfoSectionSkeleton'
import BorderedSection from '@/components/ui/BorderedSection'

export default function GradePage() {
  return (
    <>
      <GradeHeader />
      <SectionStack>
        <BorderedSection>
          <Suspense fallback={<GradeCurrentSectionSkeleton />}>
            <GradeCurrentSection />
          </Suspense>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <Suspense fallback={<GradeInfoSectionSkeleton />}>
            <GradeInfoSection />
          </Suspense>
        </BorderedSection>
      </SectionStack>
    </>
  )
}
