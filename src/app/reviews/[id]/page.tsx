import ReviewDetailHeaderSection from '@/app/reviews/[id]/ReviewDetailHeaderSection'
import { reviewRepository } from '@/domains/review/review.repository'
import type { Metadata } from 'next'
import CommentInputSection from './_components/CommentInputSection'
import CommentListSection from './_components/CommentListSection'
import { ReplyProvider } from './_components/ReplyContext'
import ReviewInfoSection from './_components/ReviewInfoSection'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const reviewId = Number(id)

  const { data } = await reviewRepository.getReviewDetail(reviewId)

  if (!data) return {}

  const title = `${data.placeName} 리뷰`
  const description = data.content
  const thumbnailUrl = data.imageUrls[0]

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

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
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
