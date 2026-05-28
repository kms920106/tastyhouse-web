import DiscountProductItem from '@/components/products/DiscountProductItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { productRepository } from '@/domains/product/product.repository'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { Fragment } from 'react'

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
      <div className="mb-10">
        {data.map((product, i, arr) => (
          <Fragment key={product.id}>
            <Link href={PAGE_PATHS.PRODUCT_DETAIL(product.id)} className="block">
              <DiscountProductItem {...product} />
            </Link>
            {i < arr.length - 1 && (
              <div className="border-t border-[#eeeeee] my-[15px]" />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-center">
        <ViewMoreButton href="/products/today-discount" />
      </div>
    </>
  )
}
