'use client'

import ForgotPasswordEmailStep from '@/app/auth/forgot-password/_components/ForgotPasswordEmailStep'
import ForgotPasswordResetStep from '@/app/auth/forgot-password/_components/ForgotPasswordResetStep'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { useState } from 'react'

export default function Page() {
  const [passwordResetToken, setPasswordResetToken] = useState<string | null>(null)

  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>비밀번호 찾기</HeaderTitle>
        </HeaderCenter>
      </Header>
      {passwordResetToken ? (
        <ForgotPasswordResetStep passwordResetToken={passwordResetToken} />
      ) : (
        <ForgotPasswordEmailStep onVerified={(_, token) => setPasswordResetToken(token)} />
      )}
    </section>
  )
}
