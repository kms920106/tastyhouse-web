import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { termsRepository } from '@/domains/terms'
import { notFound } from 'next/navigation'

export default async function TermsSection() {
  const { data } = await termsRepository.getTerms()

  if (!data) notFound()

  const { content } = data

  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>이용약관</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div
        className="px-[15px] py-7 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}
