import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import KakaoSignupSection from './_components/KakaoSignupSection'

interface KakaoSignupPageProps {
  searchParams: Promise<{
    kakaoAccessToken?: string
    email?: string
    nickname?: string
    profileImageUrl?: string
    name?: string
    phoneNumber?: string
  }>
}

export default async function KakaoSignupPage({ searchParams }: KakaoSignupPageProps) {
  const { kakaoAccessToken, email, nickname, profileImageUrl, name, phoneNumber } = await searchParams

  if (!kakaoAccessToken || !email) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return (
    <KakaoSignupSection
      kakaoAccessToken={kakaoAccessToken}
      email={email}
      prefillNickname={nickname ?? ''}
      prefillProfileImageUrl={profileImageUrl ?? ''}
      prefillName={name ?? ''}
      prefillPhoneNumber={phoneNumber ?? ''}
    />
  )
}
