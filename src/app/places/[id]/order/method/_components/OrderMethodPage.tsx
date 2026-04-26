import OrderMethodContent from './OrderMethodContent'
import OrderMethodHeader from './OrderMethodHeader'

interface Props {
  placeId: number
}

export default function OrderMethodPage({ placeId }: Props) {
  return (
    <>
      <OrderMethodHeader />
      <OrderMethodContent placeId={placeId} />
    </>
  )
}
