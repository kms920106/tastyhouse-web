import OrderReviewCreateContent from './OrderReviewCreateContent'
import OrderReviewCreateHeader from './OrderReviewCreateHeader'

interface Props {
  orderItemId: number
}

export default function OrderReviewCreatePage({ orderItemId }: Props) {
  return (
    <>
      <OrderReviewCreateHeader />
      <OrderReviewCreateContent orderItemId={orderItemId} />
    </>
  )
}
