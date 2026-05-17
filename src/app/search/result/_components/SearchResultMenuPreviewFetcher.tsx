'use client'

import BorderedSection from '@/components/ui/BorderedSection'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusPreview } from '@/domains/search/search.hook'
import Link from 'next/link'
import ProductItem from '@/components/products/ProductItem'
import { ProductItemSkeleton } from '@/components/products/ProductItemSkeleton'
import { PAGE_PATHS } from '@/lib/paths'
import React from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultMenuPreviewFetcher({ query }: Props) {
  const { data, isLoading, isError } = useSearchMenusPreview(query)

  return (
    <BorderedSection>
      <div className="px-[15px] py-[30px]">
        <SearchResultSectionHeader title="메뉴" />
        {isLoading && (
          <div>
            {Array.from({ length: 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <ProductItemSkeleton />
                {i < 2 && <div className="border-t border-[#eeeeee] my-[15px]" />}
              </React.Fragment>
            ))}
          </div>
        )}
        {isError && <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />}
        {!isLoading && !isError && (data?.data?.length ?? 0) === 0 && (
          <SearchResultEmptyState query={query} label="메뉴" />
        )}
        {!isLoading && !isError && (data?.data?.length ?? 0) > 0 && (
          <div>
            {(data?.data ?? []).map((item, i, arr) => (
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
        )}
      </div>
    </BorderedSection>
  )
}
