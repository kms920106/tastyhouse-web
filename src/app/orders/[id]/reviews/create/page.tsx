import { getReviewWriteInfo } from '@/services/review'
import { notFound } from 'next/navigation'
import OrderReviewCreateSection from './_components/OrderReviewCreateSection'

interface OrderReviewCreatePageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ orderItemId?: string }>
}

export default async function OrderReviewCreatePage({
  params,
  searchParams,
}: OrderReviewCreatePageProps) {
  const { id: orderId } = await params
  const { orderItemId } = await searchParams

  if (!orderItemId) {
    notFound()
  }

  const { data, error } = await getReviewWriteInfo(Number(orderItemId))

  if (error || !data) {
    notFound()
  }

  return (
    <OrderReviewCreateSection
      orderId={Number(orderId)}
      orderItemId={Number(orderItemId)}
      productId={data.productId}
      productName={data.productName}
      productImageUrl={data.productImageUrl}
      productPrice={data.productPrice}
    />
  )
}
