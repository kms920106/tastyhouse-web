import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from "@/domains/place"
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import PlaceOrderMethodSection from './_components/PlaceOrderMethodSection'

interface OrderMethodPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderMethodPage({ params }: OrderMethodPageProps) {
  const { id } = await params

  const placeId = Number(id)

  // API 호출
  const { error, data } = await placeRepository.getPlaceOrderMethods(placeId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 수단')} />
  }

  const { orderMethods } = data

  return <PlaceOrderMethodSection placeId={placeId} orderMethods={orderMethods} />
}
