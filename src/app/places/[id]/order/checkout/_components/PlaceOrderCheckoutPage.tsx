import PlaceOrderCheckoutContent from './PlaceOrderCheckoutContent'
import PlaceOrderCheckoutHeader from './PlaceOrderCheckoutHeader'

interface Props {
  placeId: number
}

export default function PlaceOrderCheckoutPage({ placeId }: Props) {
  return (
    <>
      <PlaceOrderCheckoutHeader />
      <PlaceOrderCheckoutContent placeId={placeId} />
    </>
  )
}
