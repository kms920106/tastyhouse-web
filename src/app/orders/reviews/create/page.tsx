import { reviewRepository } from '@/domains/review/review.repository'
import { notFound } from 'next/navigation'
import OrderReviewCreateSection from './_components/OrderReviewCreateSection'

interface Props {
  searchParams: Promise<{ orderItemId?: string }>
}

export default async function OrderReviewCreatePage({ searchParams }: Props) {
  const { orderItemId } = await searchParams

  if (!orderItemId) {
    notFound()
  }

  const { data, error } = await reviewRepository.getReviewWriteInfo(Number(orderItemId))

  if (error || !data) {
    notFound()
  }

  return (
    <OrderReviewCreateSection
      orderItemId={Number(orderItemId)}
      productId={data.productId}
      productName={data.productName}
      productImageUrl={data.productImageUrl}
      productPrice={data.productPrice}
    />
  )
}
