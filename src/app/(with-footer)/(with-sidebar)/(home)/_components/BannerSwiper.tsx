'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import styles from './BannerSwiper.module.css'

import type { Banner } from '@/domains/banner'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BannerSwiperSkeleton } from './BannerSwiperSkeleton'

interface Props {
  banners: Banner[]
}

export default function BannerSwiper({ banners }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  // Swiper는 초기화 시 DOM을 직접 조작하고 window 객체에 접근하기 때문에
  // SSR 결과와 클라이언트 렌더링 결과가 달라져 React hydration mismatch가 발생한다.
  // 이는 Swiper 라이브러리의 구조적 문제로 2026년 현재도 미해결 상태이며,
  // next/dynamic ssr:false 또는 isMounted 패턴이 공식 권장 우회책이다.
  // Swiper GitHub Discussion #8068, Issue #6443 참고.
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <BannerSwiperSkeleton />
  }

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
      className={cn(
        'w-full aspect-[375/475]',
        styles.bannerSwiper,
        banners.length === 1 && styles.bannerSwiperSingleImage,
      )}
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
                src={banner.imageUrl}
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
                src={banner.imageUrl}
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
