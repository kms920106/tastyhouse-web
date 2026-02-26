import { getOrderDetail } from '@/services/order'
import OrderDetailSection from './_components/OrderDetailSection'

interface OrderDetailPageProps {
  params: Promise<{
    orderId: string
  }>
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params

  const orderDetailResult = await getOrderDetail(Number(orderId))

  const orderDetail = orderDetailResult.data

  if (!orderDetail) {
    return <div>주문 정보를 불러올 수 없습니다.</div>
  }

  return <OrderDetailSection orderDetail={orderDetail} />
}
