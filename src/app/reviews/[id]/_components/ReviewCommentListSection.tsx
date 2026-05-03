import { Suspense } from 'react'
import ReviewCommentList from './ReviewCommentList'
import { ReviewCommentListSkeleton } from './ReviewCommentListSkeleton'

interface Props {
  reviewId: number
}

export default function ReviewCommentListSection({ reviewId }: Props) {
  return (
    <section>
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          <Suspense fallback={<ReviewCommentListSkeleton />}>
            <ReviewCommentList reviewId={reviewId} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
