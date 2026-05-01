import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { Suspense } from 'react'
import CouponList from './CouponList'
import { CouponListSkeleton } from './CouponListSkeleton'

export default async function CouponSection() {
  return (
    <section className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>쿠폰</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="px-[15px] py-[30px]">
        <Suspense fallback={<CouponListSkeleton />}>
          <CouponList />
        </Suspense>
      </div>
    </section>
  )
}
