import ErrorMessage from '@/components/ui/ErrorMessage'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import OrderMethodContentClient from './OrderMethodContentClient'

interface Props {
  placeId: number
}

export default async function OrderMethodContent({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceOrderMethods(placeId)

  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 수단')} />
  }

  const { orderMethods } = data

  return <OrderMethodContentClient placeId={placeId} orderMethods={orderMethods} />
}
