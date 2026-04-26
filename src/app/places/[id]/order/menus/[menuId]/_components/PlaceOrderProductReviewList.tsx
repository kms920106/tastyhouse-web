'use client'

import { getProductReviews } from '@/actions/product'
import ReviewPanel from '@/components/reviews/ReviewPanel'
import { PAGE_PATHS } from '@/lib/paths'

interface Props {
  productId: number
}

export default function PlaceOrderProductReviewList({ productId }: Props) {
  return (
    <ReviewPanel
      queryOptions={{
        queryKey: ['product', productId, 'product-detail-reviews'],
        queryFn: () => getProductReviews(productId, { page: 0, size: 5 }),
      }}
      viewMoreHref={PAGE_PATHS.PRODUCT_REVIEWS(productId)}
    />
  )
}
