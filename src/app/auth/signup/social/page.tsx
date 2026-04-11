'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import type { KakaoProfile } from '@/domains/auth'
import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import KakaoPhoneVerificationStep from './_components/KakaoPhoneVerificationStep'
import KakaoSignupSection from './_components/KakaoSignupSection'

interface SignupStepData {
  kakaoTempToken: string
  kakaoProfile: KakaoProfile
  phone: string
  phoneVerifyToken: string
}

interface KakaoSocialSignupPageProps {
  searchParams: Promise<{ kakaoTempToken?: string }>
}

export default function KakaoSocialSignupPage({ searchParams }: KakaoSocialSignupPageProps) {
  const { kakaoTempToken } = use(searchParams)
  const router = useRouter()
  const [signupData, setSignupData] = useState<SignupStepData | null>(null)

  if (!kakaoTempToken) {
    router.replace(PAGE_PATHS.AUTH_LOGIN)
    return null
  }

  return (
    <section className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>{signupData ? '회원가입' : '본인 인증'}</HeaderTitle>
        </HeaderCenter>
      </Header>
      {signupData ? (
        <KakaoSignupSection
          kakaoTempToken={signupData.kakaoTempToken}
          kakaoProfile={signupData.kakaoProfile}
          phone={signupData.phone}
        />
      ) : (
        <KakaoPhoneVerificationStep
          kakaoTempToken={kakaoTempToken}
          onLinked={() => router.replace(PAGE_PATHS.HOME)}
          onNeedsSignUp={(params) => setSignupData(params)}
        />
      )}
    </section>
  )
}
