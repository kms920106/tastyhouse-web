import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { Suspense } from 'react'
import ReviewCommentInput from './ReviewCommentInput'
import { ReviewCommentInputSkeleton } from './ReviewCommentInputSkeleton'

interface Props {
  isLoggedIn: boolean
  reviewId: number
}

export default function ReviewCommentInputSection({ isLoggedIn, reviewId }: Props) {
  return (
    <FixedBottomSection className="p-[15px]">
      <div className="flex items-center gap-[17px]">
        <Suspense fallback={<ReviewCommentInputSkeleton />}>
          <ReviewCommentInput isLoggedIn={isLoggedIn} reviewId={reviewId} />
        </Suspense>
      </div>
    </FixedBottomSection>
  )
}
