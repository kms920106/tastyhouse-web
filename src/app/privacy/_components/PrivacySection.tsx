import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { privacyRepository } from '@/domains/privacy'
import { notFound } from 'next/navigation'

export default async function PrivacySection() {
  const { data } = await privacyRepository.getPrivacy()

  if (!data) notFound()

  const { content } = data

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
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}
