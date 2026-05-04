import { Suspense } from 'react'
import HomeBestPlaceList from './HomeBestPlaceList'
import { HomeBestPlaceListSkeleton } from './HomeBestPlaceListSkeleton'
import HomeSectionHeader from './HomeSectionHeader'

export default async function HomeBestPlaceSection() {
  return (
    <section className="pt-[40px] pb-[30px] bg-[#f9f9f9]">
      <HomeSectionHeader
        title="베스트 플레이스"
        description="솔직한 평점으로 인증된 플레이스들을 만나보세요."
      />
      <div className="px-[15px]">
        <Suspense fallback={<HomeBestPlaceListSkeleton />}>
          <HomeBestPlaceList />
        </Suspense>
      </div>
    </section>
  )
}
