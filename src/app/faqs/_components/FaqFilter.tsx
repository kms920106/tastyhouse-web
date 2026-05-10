'use client'

import 'swiper/css'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { FaqCategory } from '@/domains/faq'
import { ALL_CATEGORY_ID, faqQueryKeys, useFaqCategories, useFaqSelectedCategory } from '@/domains/faq/faq.hook'
import { cn } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FaqFilterSkeleton } from './FaqFilterSkeleton'

export default function FaqFilter() {
  const queryClient = useQueryClient()

  const { data: selectedCategoryId = ALL_CATEGORY_ID } = useFaqSelectedCategory()
  const { data, isLoading, error } = useFaqCategories()

  const handleCategoryChange = (categoryId: number) => {
    queryClient.setQueryData(faqQueryKeys.selectedCategory, categoryId)
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
