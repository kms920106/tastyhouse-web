'use client'

import { socialSignUpAction } from '@/actions/auth'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import type { SocialProfile, SocialProvider } from '@/domains/auth'
import { PAGE_PATHS } from '@/lib/paths'
import { useRouter } from 'next/navigation'
import { use, useState } from 'react'
import SocialPhoneVerificationStep from './_components/SocialPhoneVerificationStep'
import SocialSignupSection from './_components/SocialSignupSection'

const PROVIDER_MAP: Record<string, SocialProvider> = {
  kakao: 'KAKAO',
  naver: 'NAVER',
  facebook: 'FACEBOOK',
  apple: 'APPLE',
}

interface SignupStepData {
  provider: SocialProvider
  tempToken: string
  socialProfile: SocialProfile | null
  phone: string
  phoneVerifyToken: string
}

interface Props {
  searchParams: Promise<{
    provider?: string
    tempToken?: string
  }>
}

export default function SocialSignupPage({ searchParams }: Props) {
  const router = useRouter()

  const { provider: providerParam, tempToken: tempTokenParam } = use(searchParams)

  const [signupData, setSignupData] = useState<SignupStepData | null>(null)

  const provider: SocialProvider | null = providerParam ? (PROVIDER_MAP[providerParam] ?? null) : null
  const tempToken = tempTokenParam ?? ''

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

      {signupData ? (
        <SocialSignupSection
          socialProfile={signupData.socialProfile}
          phone={signupData.phone}
          onSignUp={(formData) =>
            socialSignUpAction({
              provider: signupData.provider,
              tempToken: signupData.tempToken,
              ...formData,
            })
          }
        />
      ) : (
        <SocialPhoneVerificationStep
          provider={provider}
          tempToken={tempToken}
          onLinked={() => router.replace(PAGE_PATHS.HOME)}
          onNeedsSignUp={(params) => setSignupData({ provider, ...params })}
        />
      )}
    </section>
  )
}
