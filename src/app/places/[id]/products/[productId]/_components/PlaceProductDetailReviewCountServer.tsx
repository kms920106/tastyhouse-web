import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import PlaceProductDetailReviewTabs from './PlaceProductDetailReviewTabs'

interface Props {
  productId: number
}

export default async function PlaceProductDetailReviewCountServer({ productId }: Props) {
  const { error, data } = await productRepository.getProductReviewCount(productId)

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const { reviewCount } = data

  return <PlaceProductDetailReviewTabs productId={productId} reviewCount={reviewCount} />
}
