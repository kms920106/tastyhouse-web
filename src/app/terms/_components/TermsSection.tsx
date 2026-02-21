import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { termsService } from '@/domains/terms'

export default async function TermsSection() {
  const response = await termsService.getTerms()
  const terms = response.data?.data ?? { content: '' }

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
        dangerouslySetInnerHTML={{ __html: terms.content }}
      />
    </section>
  )
}
