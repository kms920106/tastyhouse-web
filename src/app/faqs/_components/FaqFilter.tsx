'use client'

import 'swiper/css'

import { getFaqCategories } from '@/actions/faq'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { FaqCategory } from '@/domains/faq'
import { cn } from '@/lib/utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaqFilterSkeleton } from './FaqFilterSkeleton'
import { ALL_CATEGORY_ID, FAQ_SELECTED_CATEGORY_QUERY_KEY } from './faqQueryKeys'

export default function FaqFilter() {
  const queryClient = useQueryClient()

  const { data: selectedCategoryId = ALL_CATEGORY_ID } = useQuery<number>({
    queryKey: FAQ_SELECTED_CATEGORY_QUERY_KEY,
    queryFn: () => ALL_CATEGORY_ID,
    staleTime: Infinity,
  })

  const { data, isLoading, error } = useQuery({
    queryKey: ['faq', 'categories'],
    queryFn: () => getFaqCategories(),
  })

  const handleCategoryChange = (categoryId: number) => {
    queryClient.setQueryData(FAQ_SELECTED_CATEGORY_QUERY_KEY, categoryId)
  }

  if (isLoading) {
    return <FaqFilterSkeleton />
  }

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('카테고리')} />
  }

  const categories = data.data ?? []

  if (categories.length === 0) {
    return null
  }

  return (
    <div className="pl-[15px] py-5">
      <Swiper slidesPerView="auto" spaceBetween={10}>
        <SwiperSlide style={{ width: 'auto' }}>
          <button
            onClick={() => handleCategoryChange(ALL_CATEGORY_ID)}
            className={cn(
              'px-[13px] py-[13px] text-sm leading-[14px] whitespace-nowrap border',
              selectedCategoryId === ALL_CATEGORY_ID
                ? 'text-[#a11c20] border-[#a11c20]'
                : 'text-[#aaaaaa] border-[#eeeeee]',
            )}
          >
            전체
          </button>
        </SwiperSlide>
        {categories.map((category: FaqCategory) => (
          <SwiperSlide key={category.id} style={{ width: 'auto' }}>
            <button
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                'px-[13px] py-[13px] text-sm leading-[14px] whitespace-nowrap border',
                selectedCategoryId === category.id
                  ? 'text-[#a11c20] border-[#a11c20]'
                  : 'text-[#aaaaaa] border-[#eeeeee]',
              )}
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
