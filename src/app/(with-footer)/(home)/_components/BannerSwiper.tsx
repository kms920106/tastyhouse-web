'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './BannerSwiper.module.css'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { Banner } from '@/domains/banner'
import { resolveImageUrl } from '@/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function BannerSwiperSkeleton() {
  return (
    <div className="w-full aspect-[375/475]">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  )
}

interface BannerSwiperProps {
  banners: Banner[]
}

export default function BannerSwiper({ banners }: BannerSwiperProps) {
  if (banners.length === 0) {
    return null
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{
        type: 'fraction',
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      className={`w-full aspect-[375/475] ${styles.bannerSwiper} ${banners.length === 1 ? styles.bannerSwiperSingleImage : ''}`}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={banner.id}>
          {banner.linkUrl ? (
            <Link
              href={banner.linkUrl}
              rel="noopener noreferrer"
              className="relative block w-full h-full"
            >
              <Image
                src={resolveImageUrl(banner.imageUrl)}
                alt={banner.title}
                fill
                sizes="(max-width: 500px) 100vw, 500px"
                className="object-cover"
                priority={index === 0}
              />
            </Link>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={resolveImageUrl(banner.imageUrl)}
                alt={banner.title}
                fill
                sizes="(max-width: 500px) 100vw, 500px"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
