import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { Suspense } from 'react'
import { CommentInputSkeleton } from './CommentInput'
import CommentInputServer from './CommentInputServer'

interface CommentInputSectionProps {
  params: Promise<{ id: string }>
}

export default function CommentInputSection({ params }: CommentInputSectionProps) {
  return (
    <FixedBottomSection className="p-[15px]">
      <div className="flex items-center gap-[17px]">
        <Suspense fallback={<CommentInputSkeleton />}>
          <CommentInputServer params={params} />
        </Suspense>
      </div>
    </FixedBottomSection>
  )
}
