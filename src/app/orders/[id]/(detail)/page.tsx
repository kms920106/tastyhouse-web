import { Suspense } from 'react'
import OrderDetailSection from './_components/OrderDetailSection'
import OrderDetailSkeleton from './_components/OrderDetailSkeleton'

interface OrderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params

  const orderId = Number(id)

  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderDetailSection orderId={orderId} />
    </Suspense>
  )
}
