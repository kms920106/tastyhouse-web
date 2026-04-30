import FetchErrorState from '@/components/ui/FetchErrorState'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { reviewRepository } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import CommentItem from './CommentItem'

export function CommentListSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <CommentListItemSkeleton key={i} />
      ))}
    </>
  )
}

function CommentListItemSkeleton() {
  return (
    <div className="flex gap-2.5">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-center gap-[15px] mb-2.5">
          <Skeleton className="h-[14px] w-[60px]" />
          <Skeleton className="h-[12px] w-[40px]" />
        </div>
        <Skeleton className="h-[12px] w-full" />
        <Skeleton className="h-[12px] w-3/4 mt-1" />
      </div>
    </div>
  )
}

interface Props {
  reviewId: number
}

export default async function CommentList({ reviewId }: Props) {
  const { error, status, data } = await reviewRepository.getReviewComments(reviewId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('댓글')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (data.comments.length === 0) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-sm leading-[14px] text-[#999999] text-center">
          아직 작성된 댓글이 없어요.
        </p>
        <p className="text-sm leading-[14px] text-[#999999] text-center">첫 댓글을 남겨보세요!</p>
      </div>
    )
  }

  return data.comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
}
