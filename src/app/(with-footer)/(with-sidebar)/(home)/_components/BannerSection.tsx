import { Suspense } from 'react'
import BannerContent from './BannerContent'
import { BannerSwiperSkeleton } from './BannerSwiperSkeleton'

export default function BannerSection() {
  return (
    <section>
      <Suspense fallback={<BannerSwiperSkeleton />}>
        <BannerContent />
      </Suspense>
    </section>
  )
}
