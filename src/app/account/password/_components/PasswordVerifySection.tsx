import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import PasswordVerifyForm from './PasswordVerifyForm'

interface PasswordVerifySectionProps {
  onVerified: (verifyToken: string) => void
}

export default function PasswordVerifySection({ onVerified }: PasswordVerifySectionProps) {
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
      <PasswordVerifyForm onVerified={onVerified} />
    </section>
  )
}
