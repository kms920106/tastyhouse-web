import ErrorStateSection from '@/components/ui/ErrorStateSection'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getOrderDetail } from '@/services/order'
import OrderCompleteSection from './_components/OrderCompleteSection'

interface OrderCompletePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderCompletePage({ params }: OrderCompletePageProps) {
  const { id } = await params

  const orderDetailResult = await getOrderDetail(Number(id))

  const orderDetail = orderDetailResult.data

  if (!orderDetail) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문')} />
  }

  return <OrderCompleteSection orderDetail={orderDetail} />
}
