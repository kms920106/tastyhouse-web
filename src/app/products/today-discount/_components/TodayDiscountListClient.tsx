'use client'

import DiscountProductItem from '@/components/products/DiscountProductItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { useTodayDiscountProducts } from '@/domains/product/product.hook'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import TodayDiscountGridItem from './TodayDiscountGridItem'
import TodayDiscountListSkeleton from './TodayDiscountListSkeleton'
import TodayDiscountSortDrawer, { type TodayDiscountSortType } from './TodayDiscountSortDrawer'

type ViewType = 'list' | 'grid'

type Product = { discountRate: number; discountPrice: number }

const SORT_COMPARATORS: Record<TodayDiscountSortType, ((a: Product, b: Product) => number) | null> =
  {
    RECOMMENDED: null,
    DISCOUNT_RATE: (a, b) => b.discountRate - a.discountRate,
    PRICE_LOW: (a, b) => a.discountPrice - b.discountPrice,
    PRICE_HIGH: (a, b) => b.discountPrice - a.discountPrice,
  }

export default function TodayDiscountListClient() {
  const [viewType, setViewType] = useState<ViewType>('list')
  const [sortType, setSortType] = useState<TodayDiscountSortType>('RECOMMENDED')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useTodayDiscountProducts()

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

  const products = useMemo(() => {
    const list = data?.pages.flatMap((page) => page.data ?? []) ?? []
    const comparator = SORT_COMPARATORS[sortType]
    return comparator ? [...list].sort(comparator) : list
  }, [data, sortType])

  return (
    <>
      <div className="flex items-center justify-end gap-3 px-[15px] h-[50px]">
        <TodayDiscountSortDrawer value={sortType} onChange={setSortType} />
        <button
          type="button"
          aria-label={viewType === 'list' ? '그리드 뷰로 전환' : '리스트 뷰로 전환'}
          onClick={() => setViewType((prev) => (prev === 'list' ? 'grid' : 'list'))}
          className="flex items-center justify-center cursor-pointer"
        >
          <Image
            src={
              viewType === 'list'
                ? '/images/today-discount/icon-view-01.png'
                : '/images/today-discount/icon-view-02.png'
            }
            alt={viewType === 'list' ? '그리드 뷰' : '리스트 뷰'}
            width={17}
            height={17}
          />
        </button>
      </div>

      {isLoading ? (
        <TodayDiscountListSkeleton viewType={viewType} />
      ) : isError ? (
        <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
      ) : (
        <>
          {viewType === 'list' ? (
            <div className="divide-y divide-[#eeeeee] px-[15px]">
              {products.map((product) => (
                <DiscountProductItem key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 px-[15px] py-[15px]">
              {products.map((product) => (
                <TodayDiscountGridItem key={product.id} {...product} />
              ))}
            </div>
          )}
          {isFetchingNextPage && <TodayDiscountListSkeleton viewType={viewType} count={2} />}
          <div ref={targetRef} className="h-1" aria-hidden="true" />
        </>
      )}
    </>
  )
}
