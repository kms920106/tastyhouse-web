import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import KakaoSignupSection from './_components/KakaoSignupSection'

interface KakaoSignupPageProps {
  searchParams: Promise<{
    code?: string
    email?: string
    nickname?: string
    profileImageUrl?: string
    name?: string
    phoneNumber?: string
  }>
}

export default async function KakaoSignupPage({ searchParams }: KakaoSignupPageProps) {
  const { code, email, nickname, profileImageUrl, name, phoneNumber } = await searchParams

  if (!code || !email) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  console.log(searchParams)

  return (
    <KakaoSignupSection
      code={code}
      email={email}
      prefillNickname={nickname ?? ''}
      prefillProfileImageUrl={profileImageUrl ?? ''}
      prefillName={name ?? ''}
      prefillPhoneNumber={phoneNumber ?? ''}
    />
  )
}
