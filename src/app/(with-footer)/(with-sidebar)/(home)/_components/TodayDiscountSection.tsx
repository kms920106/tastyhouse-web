import { Suspense } from 'react'
import SectionHeader from './SectionHeader'
import TodayDiscountProductList, {
  TodayDiscountProductListSkeleton,
} from './TodayDiscountProductList'

export function TodayDiscountSectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return { children }
}

export default async function TodayDiscountSection() {
  return (
    <section className="px-[15px] pt-[60px]">
      <SectionHeader
        title="오늘의 할인"
        description="테하 고객만이 누릴 수 있는 할인 혜택을 놓치지 마세요."
      />
      <Suspense fallback={<TodayDiscountProductListSkeleton />}>
        <TodayDiscountProductList />
      </Suspense>
    </section>
  )
}
