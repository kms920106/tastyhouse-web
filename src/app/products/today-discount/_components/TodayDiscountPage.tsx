import Header, { HeaderCenter, HeaderLeft, HeaderRight, HeaderTitle } from '@/components/layouts/Header'
import { BackButton, HeaderIconLink } from '@/components/layouts/header-parts'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import TodayDiscountListClient from './TodayDiscountListClient'

export default function TodayDiscountPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>오늘의 할인</HeaderTitle>
        </HeaderCenter>
        <HeaderRight>
          <HeaderIconLink href={PAGE_PATHS.CART} aria-label="장바구니">
            <Image
              src="/images/order/icon-cart-black.png"
              alt="장바구니"
              width={24}
              height={24}
            />
          </HeaderIconLink>
        </HeaderRight>
      </Header>
      <TodayDiscountListClient />
    </div>
  )
}
