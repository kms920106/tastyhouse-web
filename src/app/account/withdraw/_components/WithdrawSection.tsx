import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import WithdrawForm from './WithdrawForm'

export default function WithdrawSection() {
  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>회원탈퇴</HeaderTitle>
        </HeaderCenter>
      </Header>
      <WithdrawForm />
    </section>
  )
}
