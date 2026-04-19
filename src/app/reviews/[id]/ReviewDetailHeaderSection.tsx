import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'
import ReviewDetailHeaderServer from '@/components/reviews/ReviewDetailHeaderServer'
import { Suspense } from 'react'

interface ReviewDetailHeaderSectionProps {
  reviewId: number
}

export default function ReviewDetailHeaderSection({ reviewId }: ReviewDetailHeaderSectionProps) {
  return (
    <Suspense fallback={<ReviewDetailHeader />}>
      <ReviewDetailHeaderServer reviewId={reviewId} />
    </Suspense>
  )
}
