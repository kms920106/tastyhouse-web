import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
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
      </Header>
      <TodayDiscountListClient />
    </div>
  )
}
