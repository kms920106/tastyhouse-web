import OrderMenuContent from './OrderMenuContent'
import OrderMenuFooter from './OrderMenuFooter'
import OrderMenuHeader from './OrderMenuHeader'

interface Props {
  placeId: number
}

export default function OrderMenuPage({ placeId }: Props) {
  return (
    <>
      <OrderMenuHeader />
      <OrderMenuContent placeId={placeId} />
      <OrderMenuFooter placeId={placeId} />
    </>
  )
}
