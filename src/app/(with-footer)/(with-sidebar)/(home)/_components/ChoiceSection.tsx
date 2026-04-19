import { Suspense } from 'react'
import ChoicePlaceContent from './ChoicePlaceContent'
import { ChoiceSwiperSkeleton } from './ChoiceSwiper'
import SectionHeader from './SectionHeader'

export default async function ChoiceSection() {
  return (
    <section className="pt-[60px]">
      <SectionHeader title="테하 초이스" description="요즘 주목받고 있는 플레이스를 소개합니다." />
      <div className="pl-4">
        <Suspense fallback={<ChoiceSwiperSkeleton />}>
          <ChoicePlaceContent />
        </Suspense>
      </div>
    </section>
  )
}
