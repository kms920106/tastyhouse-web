import { reviewRepository } from '@/domains/review/review.repository'
import { notFound } from 'next/navigation'
import OrderReviewCreatePage from './_components/OrderReviewCreatePage'

interface Props {
  searchParams: Promise<{ orderItemId?: string }>
}

export default async function Page({ searchParams }: Props) {
  const { orderItemId } = await searchParams

  if (!orderItemId) {
    notFound()
  }

  const { data, error } = await reviewRepository.getReviewWriteInfo(Number(orderItemId))

  if (error || !data) {
    notFound()
  }

  return (
    <OrderReviewCreatePage
      orderItemId={Number(orderItemId)}
      productId={data.productId}
      productName={data.productName}
      productImageUrl={data.productImageUrl}
      productPrice={data.productPrice}
    />
  )
}
