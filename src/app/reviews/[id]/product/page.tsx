import ReviewProductSection from './_components/ReviewProductSection'

interface ReviewProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewProductDetailPage({ params }: ReviewProductDetailPageProps) {
  const { id } = await params
  const reviewId = Number(id)

  return <ReviewProductSection reviewId={reviewId} />
}
