import ErrorMessage from '@/components/ui/ErrorMessage'
import { reviewRepository } from "@/domains/review"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import CommentList from './CommentList'

interface CommentListServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentListServer({ params }: CommentListServerProps) {
  const { id } = await params
  const reviewId = Number(id)

  // API 호출
  const { error, data } = await reviewRepository.getReviewComments(reviewId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('댓글')} />
  }

  const { comments } = data

  return <CommentList comments={comments} />
}
