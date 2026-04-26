import { memberRepository } from '@/domains/member'
import { placeRepository } from '@/domains/place'
import PlaceOrderCheckoutContentClient from './PlaceOrderCheckoutContentClient'

interface Props {
  placeId: number
}

export default async function PlaceOrderCheckoutContent({ placeId }: Props) {
  const [placeNameResult, memberResult, couponsResult, usablePointResult] = await Promise.all([
    placeRepository.getPlaceName(placeId),
    memberRepository.getMemberMe(),
    memberRepository.getMyAvailableCoupons(),
    memberRepository.getMyUsablePoint(),
  ])

  const placeName = placeNameResult.data?.name ?? ''
  const memberInfo = memberResult.data ?? null
  const availableCoupons = couponsResult.data ?? []
  const usablePoints = usablePointResult.data?.usablePoints ?? 0

  return (
    <PlaceOrderCheckoutContentClient
      placeId={placeId}
      placeName={placeName}
      memberInfo={memberInfo}
      availableCoupons={availableCoupons}
      usablePoints={usablePoints}
    />
  )
}
