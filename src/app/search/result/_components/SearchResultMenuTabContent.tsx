'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useSearchMenusInfinite } from '@/domains/search/search.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import ProductItem from '@/components/products/ProductItem'
import { ProductItemSkeleton } from '@/components/products/ProductItemSkeleton'
import React, { useEffect } from 'react'
import SearchResultEmptyState from './SearchResultEmptyState'

interface Props {
  query: string
}

export default function SearchResultMenuTabContent({ query }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useSearchMenusInfinite(query)

  const { targetRef, isIntersecting, resetIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    enabled: hasNextPage && !isFetchingNextPage,
  })

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      resetIntersecting()
      fetchNextPage()
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage, resetIntersecting])

  if (isLoading) return (
    <div>
      {Array.from({ length: 5 }).map((_, i) => (
        <React.Fragment key={i}>
          <ProductItemSkeleton />
          {i < 4 && <div className="border-t border-[#eeeeee] my-[15px]" />}
        </React.Fragment>
      ))}
    </div>
  )
  if (isError) return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />

  const totalElements = data?.pages[0]?.pagination?.totalElements ?? 0
  if (totalElements === 0) return <SearchResultEmptyState query={query} label="메뉴" />

  const items = data?.pages.flatMap((page) => page.data ?? []) ?? []

  return (
    <div className="pb-[90px]">
      <div>
        {items.map((item, i, arr) => (
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
        {isFetchingNextPage && (
          <>
            <div className="border-t border-[#eeeeee] my-[15px]" />
            <div>
              {Array.from({ length: 2 }).map((_, i) => (
                <React.Fragment key={i}>
                  <ProductItemSkeleton />
                  {i < 1 && <div className="border-t border-[#eeeeee] my-[15px]" />}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
      <div ref={targetRef} className="h-1" aria-hidden="true" />
    </div>
  )
}
