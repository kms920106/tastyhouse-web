import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { Suspense } from 'react'
import CommentInput, { CommentInputSkeleton } from './CommentInput'

interface Props {
  isLoggedIn: boolean
  reviewId: number
}

export default function CommentInputSection({ isLoggedIn, reviewId }: Props) {
  return (
    <FixedBottomSection className="p-[15px]">
      <div className="flex items-center gap-[17px]">
        <Suspense fallback={<CommentInputSkeleton />}>
          <CommentInput isLoggedIn={isLoggedIn} reviewId={reviewId} />
        </Suspense>
      </div>
    </FixedBottomSection>
  )
}
