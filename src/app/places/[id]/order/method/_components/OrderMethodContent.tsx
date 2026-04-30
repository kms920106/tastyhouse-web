import FetchErrorState from '@/components/ui/FetchErrorState'
import { placeRepository } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import OrderMethodContentClient from './OrderMethodContentClient'

interface Props {
  placeId: number
}

export default async function OrderMethodContent({ placeId }: Props) {
  const { error, status, data } = await placeRepository.getPlaceOrderMethods(placeId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 수단')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const { orderMethods } = data

  return <OrderMethodContentClient placeId={placeId} orderMethods={orderMethods} />
}
