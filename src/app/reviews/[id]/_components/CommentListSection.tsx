import { Suspense } from 'react'
import CommentList from './CommentList'
import { CommentListSkeleton } from './CommentListSkeleton'

interface Props {
  reviewId: number
}

export default function CommentListSection({ reviewId }: Props) {
  return (
    <section>
      <div className="px-[15px] py-5">
        <div className="space-y-[30px]">
          <Suspense fallback={<CommentListSkeleton />}>
            <CommentList reviewId={reviewId} />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
