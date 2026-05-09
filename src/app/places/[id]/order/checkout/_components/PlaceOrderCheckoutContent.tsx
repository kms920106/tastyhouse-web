import { memberRepository } from '@/domains/member/member.repository'
import { placeRepository } from '@/domains/place/place.repository'
import PlaceOrderCheckoutContentClient from './PlaceOrderCheckoutContentClient'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'

interface Props {
  placeId: number
}

export default async function PlaceOrderCheckoutContent({ placeId }: Props) {
  const [placeResult, memberResult, couponsResult, usablePointResult] = await Promise.all([
    placeRepository.getPlaceDetail(placeId),
    memberRepository.getMyPersonalInfo(),
    memberRepository.getMyAvailableCoupons(),
    memberRepository.getMyUsablePoint(),
  ])

  if (
    placeResult.error ||
    !placeResult.data ||
    memberResult.error ||
    !memberResult.data ||
    couponsResult.error ||
    !couponsResult.data ||
    usablePointResult.error ||
    !usablePointResult.data
  ) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return (
    <PlaceOrderCheckoutContentClient
      place={placeResult.data}
      member={memberResult.data}
      availableCoupons={couponsResult.data}
      usablePoints={usablePointResult.data.usablePoints}
    />
  )
}
