import ReviewOptionButton from '@/components/reviews/ReviewOptionButton'
import { Suspense } from 'react'
import ReviewInfo from './ReviewInfo'
import ReviewLikeButton from './ReviewLikeButton'
import ReviewLikeButtonServer from './ReviewLikeButtonServer'
import ReviewOptionDrawerServer from './ReviewOptionDrawerServer'

export interface ReviewInfoViewProps {
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  createdAt: string
  imageUrls: string[]
  content: string
  tagNames: string[]
}

interface ReviewInfoSectionProps {
  review: ReviewInfoViewProps
  isLoggedIn: boolean
}

export default function ReviewInfoSection({ review, isLoggedIn }: ReviewInfoSectionProps) {
  const {
    reviewId,
    memberId,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
    imageUrls,
    content,
    tagNames,
  } = review

  return (
    <section className="px-[15px] pt-5 pb-8 border-b border-[#eeeeee] box-border">
      <ReviewInfo
        memberProfileImageUrl={memberProfileImageUrl}
        memberNickname={memberNickname}
        createdAt={createdAt}
        imageUrls={imageUrls}
        content={content}
        tagNames={tagNames}
        id={reviewId}
        reviewLike={
          <Suspense fallback={<ReviewLikeButton isLiked={false} disabled={true} />}>
            <ReviewLikeButtonServer reviewId={reviewId} />
          </Suspense>
        }
        reviewOption={
          <Suspense fallback={<ReviewOptionButton disabled={true} />}>
            <ReviewOptionDrawerServer
              reviewId={reviewId}
              memberId={memberId}
              memberNickname={memberNickname}
              content={content}
              isLoggedIn={isLoggedIn}
            />
          </Suspense>
        }
      />
    </section>
  )
}
