import OrderReviewCreateForm from './OrderReviewCreateForm'
import OrderReviewCreateHeader from './OrderReviewCreateHeader'

interface Props {
  orderItemId: number
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
}

export default function OrderReviewCreatePage({
  orderItemId,
  productId,
  productName,
  productImageUrl,
  productPrice,
}: Props) {
  return (
    <>
      <OrderReviewCreateHeader />
      <OrderReviewCreateForm
        orderItemId={orderItemId}
        productId={productId}
        productName={productName}
        productImageUrl={productImageUrl}
        productPrice={productPrice}
      />
    </>
  )
}
