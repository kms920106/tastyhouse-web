import { getOrderDetail } from '@/services/order'
import OrderCompleteSection from './_components/OrderCompleteSection'

interface OrderCompletePageProps {
  params: Promise<{
    orderId: string
  }>
}

export default async function OrderCompletePage({ params }: OrderCompletePageProps) {
  const { orderId } = await params
  console.log('orderId: ', orderId)

  const orderDetailResult = await getOrderDetail(Number(orderId))
  console.log(orderDetailResult)

  const orderDetail = orderDetailResult.data

  if (!orderDetail) {
    return <div>주문 정보를 불러올 수 없습니다.</div>
  }

  return <OrderCompleteSection orderDetail={orderDetail} />
}
