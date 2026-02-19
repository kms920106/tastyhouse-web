import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AdvertisingForm from './AdvertisingForm'

export default function AdvertisingSection() {
  return (
    <section className="min-h-screen bg-white pb-[80px]">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>광고 및 제휴</HeaderTitle>
        </HeaderCenter>
      </Header>
      <AdvertisingForm />
    </section>
  )
}
