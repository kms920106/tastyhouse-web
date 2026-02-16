import Header, { HeaderCenter, HeaderLeft } from '@/components/layouts/Header'
import { HeaderTitle } from '@/components/layouts/HeaderTitle'
import { BackButton } from '@/components/layouts/header-parts'
import { memberService } from '@/domains/member'
import CouponList from './CouponList'

export default async function CouponSection() {
  const coupons = await memberService.getMyCoupons()

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
        <CouponList coupons={coupons} />
      </div>
    </section>
  )
}
