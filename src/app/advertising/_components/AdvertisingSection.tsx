import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import AdvertisingForm from './AdvertisingForm'
import AdvertisingNotice from './AdvertisingNotice'

export default function AdvertisingSection() {
  return (
    <section className="min-h-screen pb-[80px]">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>광고 및 제휴</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection>
          <AdvertisingNotice />
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <AdvertisingForm />
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
