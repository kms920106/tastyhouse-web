'use client'

import ProductItem from '@/components/products/ProductItem'
import { ProductItemSkeleton } from '@/components/products/ProductItemSkeleton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusPreview } from '@/domains/search/search.hook'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import React from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'

interface Props {
  query: string
}

export default function SearchResultAllMenuList({ query }: Props) {
  const { data, isLoading, isError } = useSearchMenusPreview(query)

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 3 }).map((_, i) => (
          <React.Fragment key={i}>
            <ProductItemSkeleton />
            {i < 2 && <div className="border-t border-[#eeeeee] my-[15px]" />}
          </React.Fragment>
        ))}
      </div>
    )
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  if (!data?.data || data.data.length === 0)
    return <SearchResultEmptyState query={query} label="메뉴" />

  return (
    <div>
      {data.data!.map((item, i, arr) => (
        <React.Fragment key={item.id}>
          <Link href={PAGE_PATHS.PRODUCT_DETAIL(item.id)} className="block">
            <ProductItem
              imageUrl={item.imageUrl}
              spiciness={item.spiciness}
              name={item.name}
              originalPrice={item.originalPrice}
              discountPrice={item.discountPrice}
              discountRate={item.discountRate}
              rating={item.rating}
              reviewCount={item.reviewCount}
            />
          </Link>
          {i < arr.length - 1 && <div className="border-t border-[#eeeeee] my-[15px]" />}
        </React.Fragment>
      ))}
    </div>
  )
}
