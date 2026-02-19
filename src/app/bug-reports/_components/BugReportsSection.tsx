import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BugReportsForm from './BugReportsForm'

export default function BugReportsSection() {
  return (
    <section className="min-h-screen bg-white pb-[80px]">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>버그제보</HeaderTitle>
        </HeaderCenter>
      </Header>
      <BugReportsForm />
    </section>
  )
}
