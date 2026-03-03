'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Rating from '@/components/ui/Rating'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { resolveImageUrl } from '@/lib/image'
import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function BestReviewSwiperSkeleton() {
  return (
    <div className="overflow-hidden pb-[53px]">
      <div
        className="flex gap-4"
        style={{
          transform: 'translateX(calc(50% - (100% / 1.5 / 2) - 8px - (100% / 1.5) - 16px))',
        }}
      >
        <ReviewCardSkeleton className="scale-90 opacity-60" />
        <ReviewCardSkeleton />
        <ReviewCardSkeleton className="scale-90 opacity-60" />
      </div>
    </div>
  )
}

function ReviewCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex-shrink-0 transition-all duration-300', className)}
      style={{ width: 'calc(100% / 1.5)' }}
    >
      <Skeleton className="relative w-full mb-[15px] pt-[75%] rounded-none" />
      <div className="mb-1.5 flex items-center justify-between">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-5 w-8" />
      </div>
      <Skeleton className="mb-[19px] h-4 w-2/3" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  )
}

type BestReviewItem = {
  id: number
  content: string
  imageUrl: string
  stationName: string
  title: string
  totalRating: number
}

interface BestReviewSwiperProps {
  reviews: BestReviewItem[]
}

export default function BestReviewSwiper({ reviews }: BestReviewSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentSlide, setCurrentSlide] = useState(2)
  const [totalSlides, setTotalSlides] = useState(reviews.length)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return BestReviewSwiperSkeleton()
  }

  if (reviews.length === 0) {
    return null
  }

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={1.5}
        centeredSlides={true}
        initialSlide={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
          setTotalSlides(swiper.slides.length)
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1)
        }}
        className="!pb-[53px]"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={review.id} className="transition-all duration-300">
            {({ isActive }) => (
              <Link
                href={PAGE_PATHS.REVIEW_DETAIL(review.id)}
                className={`block h-full overflow-hidden transition-all duration-300 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-60'
                }`}
              >
                <div className="relative mb-[15px] w-full bg-gray-100 pt-[75%]">
                  <Image
                    src={resolveImageUrl(review.imageUrl)}
                    alt={review.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 40vw, 33vw"
                    className="object-cover"
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs leading-[12px] text-[#999999] truncate">
                    {review.stationName}
                  </span>
                  <Rating value={review.totalRating} />
                </div>
                <h3 className="mb-[19px]  leading-[16px] truncate">{review.title}</h3>
                <p className="text-xs leading-relaxed text-[#666666] line-clamp-4">
                  {review.content}
                </p>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative flex items-center justify-center pt-4">
        <SlArrowLeft
          className="absolute left-1/2 -translate-x-[85px] cursor-pointer"
          size={15}
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <div className="absolute left-1/2 -translate-x-1/2 text-sm">
          {currentSlide} <span className="text-[#aaaaaa]"> / {totalSlides}</span>
        </div>
        <SlArrowRight
          className="absolute left-1/2 translate-x-[70px] cursor-pointer"
          size={15}
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </>
  )
}
