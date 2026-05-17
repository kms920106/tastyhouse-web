import DiscountProductItem from '@/components/products/DiscountProductItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { productRepository } from '@/domains/product/product.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'

export default async function HomeTodayDiscountProductList() {
  const { error, status, data } = await productRepository.getTodayDiscountProducts({
    page: 0,
    size: 4,
  })

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  return (
    <>
      <div className="mb-10 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {data.map((product) => (
          <DiscountProductItem
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
