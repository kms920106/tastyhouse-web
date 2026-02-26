import { getMemberAvailableCoupons, getMemberMe, getMemberUsablePoint } from '@/services/member'
import { getPlaceName } from '@/services/place'
import OrderCheckoutSection from './_components/OrderCheckoutSection'

interface OrderCheckoutPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function OrderCheckoutPage({ params }: OrderCheckoutPageProps) {
  const { id } = await params

  const placeId = Number(id)

  const [placeNameResult, memberResult, couponsResult, usablePointResult] = await Promise.all([
    getPlaceName(placeId),
    getMemberMe(),
    getMemberAvailableCoupons(),
    getMemberUsablePoint(),
  ])

  const placeName = placeNameResult.data?.name ?? ''
  const memberInfo = memberResult.data ?? null
  const availableCoupons = couponsResult.data ?? []
  const usablePoints = usablePointResult.data?.usablePoints ?? 0

  return (
    <OrderCheckoutSection
      placeId={placeId}
      placeName={placeName}
      memberInfo={memberInfo}
      availableCoupons={availableCoupons}
      usablePoints={usablePoints}
    />
  )
}
