import { reviewRepository } from '@/domains/review/review.repository'
import type { Metadata } from 'next'
import ReviewDetailHeaderSection from '@/components/reviews/ReviewDetailHeaderSection'
import CommentInputSection from './_components/CommentInputSection'
import CommentListSection from './_components/CommentListSection'
import { ReplyProvider } from './_components/ReplyContext'
import ReviewInfoSection from './_components/ReviewInfoSection'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ReviewDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const reviewId = Number(id)

  const { data: review } = await reviewRepository.getReviewDetail(reviewId)

  if (!review) return {}

  const title = `${review.placeName} 리뷰`
  const description = review.content
  const thumbnailUrl = review.imageUrls[0]

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
  }
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { id } = await params

  const reviewId = Number(id)

  return (
    <ReplyProvider>
      <ReviewDetailHeaderSection reviewId={reviewId} />
      <div className="pb-20">
        <ReviewInfoSection reviewId={reviewId} />
        <CommentListSection params={params} />
      </div>
      <CommentInputSection params={params} />
    </ReplyProvider>
  )
}
