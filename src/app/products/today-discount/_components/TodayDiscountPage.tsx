import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import TodayDiscountListClient from './TodayDiscountListClient'
import TodayDiscountListSkeleton from './TodayDiscountListSkeleton'

export default function TodayDiscountPage() {
  return (
    <>
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>오늘의 할인</HeaderTitle>
        </HeaderCenter>
      </Header>
      <Suspense fallback={<TodayDiscountListSkeleton viewType="list" />}>
        <TodayDiscountListClient />
      </Suspense>
    </>
  )
}
