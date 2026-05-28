import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import TodayDiscountListClient from './TodayDiscountListClient'

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
      <TodayDiscountListClient />
    </>
  )
}
