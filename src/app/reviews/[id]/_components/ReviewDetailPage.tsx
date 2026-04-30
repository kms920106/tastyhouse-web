import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import { reviewRepository } from '@/domains/review'
import { getIsLoggedIn } from '@/lib/auth-config'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import CommentInputSection from './CommentInputSection'
import CommentListSection from './CommentListSection'
import { ReplyProvider } from './ReplyContext'
import ReviewInfoSection, { ReviewInfoViewProps } from './ReviewInfoSection'

interface Props {
  reviewId: number
}

export default async function ReviewDetailPage({ reviewId }: Props) {
  const [{ error, data }, isLoggedIn] = await Promise.all([
    reviewRepository.getReviewDetail(reviewId),
    getIsLoggedIn(),
  ])

  if (error) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  const {
    id,
    memberId,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
    imageUrls,
    content,
    tagNames,
  } = data

  const reviewInfoView = {
    reviewId: id,
    memberId,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
    imageUrls,
    content,
    tagNames,
  } satisfies ReviewInfoViewProps

  return (
    <ReplyProvider>
      <ReviewDetailHeader memberNickname={memberNickname} />
      <div className="pb-20">
        <ReviewInfoSection review={reviewInfoView} isLoggedIn={isLoggedIn} />
        <CommentListSection reviewId={reviewId} />
      </div>
      <CommentInputSection isLoggedIn={isLoggedIn} reviewId={reviewId} />
    </ReplyProvider>
  )
}
