import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { reviewRepository } from '@/domains/review/review.repository'
import { getIsLoggedIn } from '@/lib/auth-config'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import ReviewCommentInputSection from './ReviewCommentInputSection'
import ReviewCommentListSection from './ReviewCommentListSection'
import { ReviewReplyProvider } from './ReviewReplyProvider'
import ReviewInfoSection from './ReviewInfoSection'

interface Props {
  reviewId: number
}

export default async function ReviewDetailPage({ reviewId }: Props) {
  const [{ error, status, data }, isLoggedIn] = await Promise.all([
    reviewRepository.getReviewDetail(reviewId),
    getIsLoggedIn(),
  ])

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
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

  return (
    <ReviewReplyProvider>
      <ReviewDetailHeader memberNickname={memberNickname} />
      <div className="pb-20">
        <ReviewInfoSection
          reviewId={id}
          memberId={memberId}
          memberNickname={memberNickname}
          memberProfileImageUrl={memberProfileImageUrl}
          createdAt={createdAt}
          imageUrls={imageUrls}
          content={content}
          tagNames={tagNames}
          isLoggedIn={isLoggedIn}
        />
        <ReviewCommentListSection reviewId={reviewId} />
      </div>
      <ReviewCommentInputSection isLoggedIn={isLoggedIn} reviewId={reviewId} />
    </ReviewReplyProvider>
  )
}
