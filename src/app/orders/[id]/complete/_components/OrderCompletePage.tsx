import OrderCompleteContent from './OrderCompleteContent'
import OrderCompleteHeader from './OrderCompleteHeader'

interface Props {
  orderId: number
}

export default async function OrderCompletePage({ orderId }: Props) {
  return (
    <>
      <OrderCompleteHeader />
      <OrderCompleteContent orderId={orderId} />
    </>
  )
}
