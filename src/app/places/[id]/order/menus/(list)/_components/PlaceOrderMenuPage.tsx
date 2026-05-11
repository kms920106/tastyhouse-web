import PlaceOrderMenuContent from './PlaceOrderMenuContent'
import PlaceOrderMenuFooter from './PlaceOrderMenuFooter'
import PlaceOrderMenuHeader from './PlaceOrderMenuHeader'

interface Props {
  placeId: number
}

export default function PlaceOrderMenuPage({ placeId }: Props) {
  return (
    <>
      <PlaceOrderMenuHeader />
      <PlaceOrderMenuContent placeId={placeId} />
      <PlaceOrderMenuFooter placeId={placeId} />
    </>
  )
}
