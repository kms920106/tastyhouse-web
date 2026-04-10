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

  // 신규 회원: 카카오 프로필 정보를 쿼리 파라미터로 전달하여 휴대폰 인증 후 소셜 회원가입 페이지로 리다이렉트
  if (result.status === 'NEEDS_SIGN_UP') {
    const kakaoParams = new URLSearchParams({
      kakaoAccessToken: result.kakaoProfile.kakaoAccessToken,
      email: result.kakaoProfile.email,
      nickname: result.kakaoProfile.nickname,
      profileImageUrl: result.kakaoProfile.profileImageUrl ?? '',
      name: result.kakaoProfile.name ?? '',
      phoneNumber: result.kakaoProfile.phoneNumber ?? '',
    })
    redirect(
      `${PAGE_PATHS.AUTH_PHONE_VERIFICATION}?next=${encodeURIComponent(`${PAGE_PATHS.AUTH_SIGNUP_SOCIAL}?${kakaoParams.toString()}`)}`,
    )
  }

  // 기존 회원: 동일 이메일 계정이 존재하여 카카오 계정 연동 페이지로 리다이렉트
  if (result.status === 'NEEDS_LINKING') {
    const kakaoParams = new URLSearchParams({
      accessToken: result.kakaoProfile.accessToken,
    })
    redirect(`${PAGE_PATHS.AUTH_LINK_KAKAO}?${kakaoParams.toString()}`)
  }

  redirect(PAGE_PATHS.HOME)
}
