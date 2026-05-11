import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { reviewRepository } from '@/domains/review/review.repository'
import OrderReviewCreateForm from './OrderReviewCreateForm'

interface Props {
  orderItemId: number
}

export default async function OrderReviewCreateContent({ orderItemId }: Props) {
  const { error, status, data } = await reviewRepository.getReviewWriteInfo(orderItemId)

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰 작성')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return (
    <OrderReviewCreateForm
      orderItemId={orderItemId}
      productId={data.productId}
      productName={data.productName}
      productImageUrl={data.productImageUrl}
      productPrice={data.productPrice}
    />
  )
}
