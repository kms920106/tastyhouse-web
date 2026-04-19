import ReviewOptionButton from '@/components/reviews/ReviewOptionButton'
import ReviewOptionDrawer from '@/components/reviews/ReviewOptionDrawer'
import ReviewOptionError from '@/components/reviews/ReviewOptionError'
import { reviewRepository } from '@/domains/review'
import { getIsLoggedIn } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface ReviewOptionDrawerServerProps {
  reviewId: number
}

export default async function ReviewOptionDrawerServer({
  reviewId,
}: ReviewOptionDrawerServerProps) {
  const isLoggedIn = await getIsLoggedIn()

  if (!isLoggedIn) {
    return (
      <Link href={PAGE_PATHS.LOGIN}>
        <ReviewOptionButton />
      </Link>
    )
  }

  // API 호출
  const { error, data } = await reviewRepository.getReviewDetail(reviewId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ReviewOptionError />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ReviewOptionError />
  }

  const { memberId, memberNickname, content } = data

  return (
    <ReviewOptionDrawer
      reviewId={reviewId}
      memberId={memberId}
      memberNickname={memberNickname}
      content={content}
    />
  )
}
