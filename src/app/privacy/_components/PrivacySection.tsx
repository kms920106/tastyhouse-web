import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { privacyService } from '@/domains/privacy'

export default async function PrivacySection() {
  const response = await privacyService.getPrivacy()
  const privacy = response.data?.data ?? { content: '' }

  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>개인정보처리방침</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div
        className="px-[15px] py-7 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: privacy.content }}
      />
    </section>
  )
}
