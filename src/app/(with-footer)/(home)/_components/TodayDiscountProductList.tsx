import ProductItem, { ProductItemSkeleton } from '@/components/products/ProductItem'
import ErrorMessage from '@/components/ui/ErrorMessage'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import type { ProductTodayDiscountListItemResponse, ProductTodayDiscountQuery } from '@/domains/place'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'

const PRODUCTS_TODAY_DISCOUNTS_ENDPOINT = '/api/products/v1/today-discounts'

export function TodayDiscountProductListSkeleton() {
  return (
    <>
      <div className="mb-10 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {[...Array(4)].map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    </>
  )
}

export default async function TodayDiscountProductList() {
  // API 호출
  const query = {
    params: {
      page: 0,
      size: 4,
    } satisfies ProductTodayDiscountQuery,
  }
  const { data, error } = await api.get<ProductTodayDiscountListItemResponse[]>(
    PRODUCTS_TODAY_DISCOUNTS_ENDPOINT,
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  return (
    <>
      <div className="mb-10 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {data.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            placeName={product.placeName}
            name={product.name}
            imageUrl={product.imageUrl}
            originalPrice={product.originalPrice}
            discountPrice={product.discountPrice}
            discountRate={product.discountRate}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <ViewMoreButton href="/products/today-discount" />
      </div>
    </>
  )
}
