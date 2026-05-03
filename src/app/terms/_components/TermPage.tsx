import { Suspense } from 'react'
import TermsContent from './TermsContent'
import TermsContentSkeleton from './TermsContentSkeleton'
import TermsHeader from './TermsHeader'

export default async function TermPage() {
  return (
    <>
      <TermsHeader />
      <Suspense fallback={<TermsContentSkeleton />}>
        <TermsContent />
      </Suspense>
    </>
  )
}
