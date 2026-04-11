'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import type { KakaoProfile, NaverProfile } from '@/domains/auth'
import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import KakaoPhoneVerificationStep from './_components/KakaoPhoneVerificationStep'
import KakaoSignupSection from './_components/KakaoSignupSection'
import NaverPhoneVerificationStep from './_components/NaverPhoneVerificationStep'
import NaverSignupSection from './_components/NaverSignupSection'

type Provider = 'kakao' | 'naver'

interface KakaoSignupStepData {
  provider: 'kakao'
  kakaoTempToken: string
  kakaoProfile: KakaoProfile
  phone: string
  phoneVerifyToken: string
}

interface NaverSignupStepData {
  provider: 'naver'
  naverTempToken: string
  naverProfile: NaverProfile
  phone: string
  phoneVerifyToken: string
}

type SignupStepData = KakaoSignupStepData | NaverSignupStepData

interface SocialSignupPageProps {
  searchParams: Promise<{ kakaoTempToken?: string; naverTempToken?: string }>
}

export default function SocialSignupPage({ searchParams }: SocialSignupPageProps) {
  const { kakaoTempToken, naverTempToken } = use(searchParams)
  const router = useRouter()
  const [signupData, setSignupData] = useState<SignupStepData | null>(null)

  const provider: Provider | null = kakaoTempToken ? 'kakao' : naverTempToken ? 'naver' : null

  if (!provider) {
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

      {provider === 'kakao' && (
        <>
          {signupData?.provider === 'kakao' ? (
            <KakaoSignupSection
              kakaoTempToken={signupData.kakaoTempToken}
              kakaoProfile={signupData.kakaoProfile}
              phone={signupData.phone}
            />
          ) : (
            <KakaoPhoneVerificationStep
              kakaoTempToken={kakaoTempToken!}
              onLinked={() => router.replace(PAGE_PATHS.HOME)}
              onNeedsSignUp={(params) => setSignupData({ provider: 'kakao', ...params })}
            />
          )}
        </>
      )}

      {provider === 'naver' && (
        <>
          {signupData?.provider === 'naver' ? (
            <NaverSignupSection
              naverTempToken={signupData.naverTempToken}
              naverProfile={signupData.naverProfile}
              phone={signupData.phone}
            />
          ) : (
            <NaverPhoneVerificationStep
              naverTempToken={naverTempToken!}
              onLinked={() => router.replace(PAGE_PATHS.HOME)}
              onNeedsSignUp={(params) => setSignupData({ provider: 'naver', ...params })}
            />
          )}
        </>
      )}
    </section>
  )
}
