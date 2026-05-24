import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { productRepository } from '@/domains/product/product.repository'
import ProductDetailReviewTabs from './ProductDetailReviewTabs'

interface Props {
  productId: number
}

export default async function ProductDetailReviewCountServer({ productId }: Props) {
  const reviewCountResult = await productRepository.getProductReviewCount(productId)

  if (reviewCountResult.error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const reviewCount = reviewCountResult.data?.reviewCount ?? 0

  return <ProductDetailReviewTabs productId={productId} reviewCount={reviewCount} />
}
