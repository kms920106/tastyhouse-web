'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import type { AppleProfile, FacebookProfile, KakaoProfile, NaverProfile } from '@/domains/auth'
import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import ApplePhoneVerificationStep from './_components/ApplePhoneVerificationStep'
import AppleSignupSection from './_components/AppleSignupSection'
import FacebookPhoneVerificationStep from './_components/FacebookPhoneVerificationStep'
import FacebookSignupSection from './_components/FacebookSignupSection'
import KakaoPhoneVerificationStep from './_components/KakaoPhoneVerificationStep'
import KakaoSignupSection from './_components/KakaoSignupSection'
import NaverPhoneVerificationStep from './_components/NaverPhoneVerificationStep'
import NaverSignupSection from './_components/NaverSignupSection'

type Provider = 'kakao' | 'naver' | 'facebook' | 'apple'

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

interface FacebookSignupStepData {
  provider: 'facebook'
  facebookTempToken: string
  facebookProfile: FacebookProfile
  phone: string
  phoneVerifyToken: string
}

interface AppleSignupStepData {
  provider: 'apple'
  appleTempToken: string
  appleProfile: AppleProfile
  phone: string
  phoneVerifyToken: string
}

type SignupStepData =
  | KakaoSignupStepData
  | NaverSignupStepData
  | FacebookSignupStepData
  | AppleSignupStepData

interface SocialSignupPageProps {
  searchParams: Promise<{
    kakaoTempToken?: string
    naverTempToken?: string
    facebookTempToken?: string
    appleTempToken?: string
  }>
}

export default function SocialSignupPage({ searchParams }: SocialSignupPageProps) {
  const { kakaoTempToken, naverTempToken, facebookTempToken, appleTempToken } = use(searchParams)
  const router = useRouter()
  const [signupData, setSignupData] = useState<SignupStepData | null>(null)

  const provider: Provider | null = kakaoTempToken
    ? 'kakao'
    : naverTempToken
      ? 'naver'
      : facebookTempToken
        ? 'facebook'
        : appleTempToken
          ? 'apple'
          : null

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

      {provider === 'facebook' && (
        <>
          {signupData?.provider === 'facebook' ? (
            <FacebookSignupSection
              facebookTempToken={signupData.facebookTempToken}
              facebookProfile={signupData.facebookProfile}
              phone={signupData.phone}
            />
          ) : (
            <FacebookPhoneVerificationStep
              facebookTempToken={facebookTempToken!}
              onLinked={() => router.replace(PAGE_PATHS.HOME)}
              onNeedsSignUp={(params) => setSignupData({ provider: 'facebook', ...params })}
            />
          )}
        </>
      )}

      {provider === 'apple' && (
        <>
          {signupData?.provider === 'apple' ? (
            <AppleSignupSection
              appleTempToken={signupData.appleTempToken}
              appleProfile={signupData.appleProfile}
              phone={signupData.phone}
            />
          ) : (
            <ApplePhoneVerificationStep
              appleTempToken={appleTempToken!}
              onLinked={() => router.replace(PAGE_PATHS.HOME)}
              onNeedsSignUp={(params) => setSignupData({ provider: 'apple', ...params })}
            />
          )}
        </>
      )}
    </section>
  )
}
