import { Suspense } from 'react'
import BestPlaceList, { BestPlaceListSkeleton } from './BestPlaceList'
import SectionHeader from './SectionHeader'

export default async function BestPlaceSection() {
  return (
    <section className="pt-[40px] pb-[30px] bg-[#f9f9f9]">
      <SectionHeader
        title="베스트 플레이스"
        description="솔직한 평점으로 인증된 플레이스들을 만나보세요."
      />
      <div className="px-[15px]">
        <Suspense fallback={<BestPlaceListSkeleton />}>
          <BestPlaceList />
        </Suspense>
      </div>
    </section>
  )
}
