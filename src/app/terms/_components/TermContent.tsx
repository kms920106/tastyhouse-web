import { Suspense } from 'react'
import TermHtmlContent from './TermHtmlContent'
import HtmlContentSkeleton from '../../../components/ui/HtmlContentSkeleton'

export default async function TermContent() {
  return (
    <div className="px-[15px] py-7">
      <Suspense fallback={<HtmlContentSkeleton />}>
        <TermHtmlContent />
      </Suspense>
    </div>
  )
}
