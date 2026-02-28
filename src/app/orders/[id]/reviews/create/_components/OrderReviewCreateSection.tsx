import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import OrderReviewCreateForm from './OrderReviewCreateForm'

interface OrderReviewCreateSectionProps {
  orderId: number
  orderItemId: number
  productId: number
  productName: string
  productImageUrl: string
  productPrice: number
}

export default function OrderReviewCreateSection({
  orderId,
  orderItemId,
  productId,
  productName,
  productImageUrl,
  productPrice,
}: OrderReviewCreateSectionProps) {
  return (
    <section className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>리뷰 작성</HeaderTitle>
        </HeaderCenter>
      </Header>
      <OrderReviewCreateForm
        orderId={orderId}
        orderItemId={orderItemId}
        productId={productId}
        productName={productName}
        productImageUrl={productImageUrl}
        productPrice={productPrice}
      />
    </section>
  )
}
