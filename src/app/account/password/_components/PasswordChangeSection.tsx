import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import PasswordChangeForm from './PasswordChangeForm'

interface PasswordChangeSectionProps {
  verifyToken: string
}

export default function PasswordChangeSection({ verifyToken }: PasswordChangeSectionProps) {
  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>비밀번호 변경</HeaderTitle>
        </HeaderCenter>
      </Header>
      <PasswordChangeForm verifyToken={verifyToken} />
    </section>
  )
}
