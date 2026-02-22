import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AccountInfoEditForm from './AccountInfoEditForm'

export default function AccountInfoEditSection() {
  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>개인정보 수정</HeaderTitle>
        </HeaderCenter>
      </Header>
      <AccountInfoEditForm />
    </section>
  )
}
