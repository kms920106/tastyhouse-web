import { kakaoLoginAction } from '@/actions/auth'
import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'

interface KakaoCallbackPageProps {
  searchParams: Promise<{ code?: string; error?: string }>
}

export default async function KakaoCallbackPage({ searchParams }: KakaoCallbackPageProps) {
  const { code, error } = await searchParams

  if (error || !code) {
    redirect(`${PAGE_PATHS.AUTH_LOGIN}?error=kakao_auth_failed`)
  }

  const result = await kakaoLoginAction(code)

  if (!result.success) {
    redirect(`${PAGE_PATHS.AUTH_LOGIN}?error=kakao_login_failed`)
  }

  if (result.needsSignUp) {
    const params = new URLSearchParams({
      providerId: result.kakaoProfile.providerId,
      code: result.kakaoProfile.code,
      email: result.kakaoProfile.email,
      nickname: result.kakaoProfile.nickname,
      profileImageUrl: result.kakaoProfile.profileImageUrl ?? '',
      name: result.kakaoProfile.name ?? '',
      phoneNumber: result.kakaoProfile.phoneNumber ?? '',
    })
    redirect(`${PAGE_PATHS.AUTH_SIGNUP_SOCIAL}?${params.toString()}`)
  }

  redirect(PAGE_PATHS.HOME)
}
