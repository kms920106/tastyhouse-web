'use client'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import ProductItem, { ProductItemSkeleton } from '@/components/products/ProductItem'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import type { Place } from '@/domains/place'
import type { Product } from '@/domains/product'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

export function ChoiceSwiperSkeleton() {
  return (
    <div className="pb-12">
      <div className="flex gap-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="swiper-slide-skeleton flex-shrink-0"
            style={{ width: 'calc((100% - 3px) / 1.15)' }}
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-200 animate-pulse">
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <Skeleton className="w-3/4 h-[17px] mb-3" />
                <Skeleton className="w-full h-3 opacity-90 leading-relaxed mb-1" />
                <Skeleton className="w-full h-3 opacity-90 leading-relaxed" />
              </div>
            </div>
            <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-b border-[#eeeeee]">
              <ProductItemSkeleton />
              <ProductItemSkeleton />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ChoiceSwiperProps {
  places: Place[]
}

export default function ChoiceSwiper({ places }: ChoiceSwiperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return ChoiceSwiperSkeleton()
  }

  return (
    <>
      <Swiper spaceBetween={20} slidesPerView={1.15} className="pb-12">
        {places.map((place: Place) => (
          <SwiperSlide key={place.id}>
            <Link href={PAGE_PATHS.PLACE_DETAIL(place.id)}>
              <div className="relative w-full aspect-[2/3] overflow-hidden">
                <Image
                  src={place.imageUrl}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-[30px] text-white">
                  <h3 className="mb-3 text-[17px] leading-[17px] font-nanum-myeongjo-bold font-bold">
                    {place.title}
                  </h3>
                  <p className="text-xs opacity-90 leading-relaxed">{place.content}</p>
                </div>
              </div>
            </Link>
            <div className="mb-10 space-y-0 divide-y divide-[#eeeeee] border-b border-[#eeeeee]">
              {place.products.map((product: Product) => (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
