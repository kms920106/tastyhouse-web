import { Suspense } from 'react'
import OrderDetailSection from './_components/OrderDetailSection'

interface OrderDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params

  const orderId = Number(id)

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <OrderDetailSection orderId={orderId} />
    </Suspense>
  )
}
