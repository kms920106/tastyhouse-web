'use client'

import { facebookLoginAction, loginFormAction } from '@/actions/auth'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { CloseButton } from '@/components/layouts/header-parts'
import AppFullButton from '@/components/ui/AppFullButton'
import AppInputEmail from '@/components/ui/AppInputEmail'
import AppInputPassword from '@/components/ui/AppInputPassword'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { toast } from '@/components/ui/AppToaster'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import { env } from '@/lib/env'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { FaApple, FaFacebookF } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
})

type FormErrors = Partial<Record<keyof z.infer<typeof loginSchema>, string>>

export default function LoginSection() {
  const router = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const [state, formAction] = useActionState(loginFormAction, null)
  const [isSubmitting, startSubmitTransition] = useTransition()

  const handleSocialLogin = (provider: 'kakao' | 'naver' | 'facebook' | 'apple') => {
    if (provider === 'apple') {
      const appleAuthUrl = new URL('https://appleid.apple.com/auth/authorize')
      appleAuthUrl.searchParams.set('client_id', env.NEXT_PUBLIC_APPLE_CLIENT_ID)
      appleAuthUrl.searchParams.set(
        'redirect_uri',
        `${env.NEXT_PUBLIC_SITE_URL}/auth/callback/apple`,
      )
      appleAuthUrl.searchParams.set('response_type', 'code id_token')
      appleAuthUrl.searchParams.set('scope', 'name email')
      appleAuthUrl.searchParams.set('response_mode', 'form_post')
      appleAuthUrl.searchParams.set('state', crypto.randomUUID())
      window.location.href = appleAuthUrl.toString()
      return
    }

    if (provider === 'kakao') {
      const kakaoAuthUrl = new URL('https://kauth.kakao.com/oauth/authorize')
      kakaoAuthUrl.searchParams.set('client_id', process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY ?? '')
      kakaoAuthUrl.searchParams.set(
        'redirect_uri',
        `${env.NEXT_PUBLIC_SITE_URL}/auth/callback/kakao`,
      )
      kakaoAuthUrl.searchParams.set('response_type', 'code')
      kakaoAuthUrl.searchParams.set('scope', 'profile_nickname profile_image account_email')
      window.location.href = kakaoAuthUrl.toString()
      return
    }

    if (provider === 'naver') {
      const state = crypto.randomUUID()
      const naverAuthUrl = new URL('https://nid.naver.com/oauth2.0/authorize')
      naverAuthUrl.searchParams.set('response_type', 'code')
      naverAuthUrl.searchParams.set('client_id', env.NEXT_PUBLIC_NAVER_CLIENT_ID)
      naverAuthUrl.searchParams.set(
        'redirect_uri',
        `${env.NEXT_PUBLIC_SITE_URL}/auth/callback/naver`,
      )
      naverAuthUrl.searchParams.set('state', state)
      window.location.href = naverAuthUrl.toString()
      return
    }

    if (provider === 'facebook') {
      if (typeof window === 'undefined' || !window.FB) {
        toast('페이스북 SDK가 로드되지 않았습니다. 잠시 후 다시 시도해 주세요.')
        return
      }

      window.FB.login(
        async (response) => {
          if (response.status !== 'connected' || !response.authResponse?.accessToken) {
            toast('페이스북 로그인이 취소되었습니다.')
            return
          }

          const result = await facebookLoginAction(response.authResponse.accessToken)

          if (!result.success) {
            toast(result.error)
            return
          }

          if (result.status === 'LOGIN') {
            window.location.href = PAGE_PATHS.HOME
            return
          }

          if (result.status === 'NEEDS_SIGN_UP' || result.status === 'NEEDS_LINKING') {
            router.push(
              `${PAGE_PATHS.AUTH_SIGNUP_SOCIAL}?facebookTempToken=${result.facebookTempToken}`,
            )
            return
          }
        },
        { scope: 'public_profile,email' },
      )
    }
  }

  useEffect(() => {
    if (state && !state.success) {
      toast(state.error)
    }
  }, [state])

  const validateForm = (): boolean => {
    const result = loginSchema.safeParse({ username, password })
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    startSubmitTransition(() => {
      formAction(new FormData(e.currentTarget))
    })
  }

  return (
    <section className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <CloseButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>로그인</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="px-[15px] py-[30px]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* 이메일 */}
            <div className="flex flex-col gap-2">
              <AppInputEmail
                id="username"
                name="username"
                placeholder="아이디(이메일주소)를 입력해 주세요."
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }))
                }}
                className={
                  errors.username ? 'border-[#bc4040] focus-visible:border-[#bc4040]' : undefined
                }
              />
              {errors.username && (
                <p className="text-xs leading-[12px] text-[#bc4040]">{errors.username}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-2">
              <AppInputPassword
                id="password"
                name="password"
                placeholder="비밀번호를 입력해 주세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                }}
                className={
                  errors.password ? 'border-[#bc4040] focus-visible:border-[#bc4040]' : undefined
                }
              />
              {errors.password && (
                <p className="text-xs leading-[12px] text-[#bc4040]">{errors.password}</p>
              )}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <CircleCheckbox checked={keepLoggedIn} onChange={setKeepLoggedIn} />
              <span className="text-sm leading-[14px] text-[#666666]">로그인 상태 유지</span>
            </label>
            <input type="hidden" name="rememberMe" value={String(keepLoggedIn)} />
          </div>
          <div className="mt-[30px]">
            <AppPrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '로그인 중...' : '로그인'}
            </AppPrimaryButton>
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 mt-5">
          <Link href={'/auth/signup'} className="text-sm leading-[14px] text-[#666666]">
            회원가입
          </Link>
          <span className="text-sm leading-[14px] text-[#666666]">|</span>
          <Link href={'/auth/forgot-password'} className="text-sm leading-[14px] text-[#666666]">
            비밀번호 찾기
          </Link>
        </div>
        <div className="mt-[60px] space-y-2.5">
          {/* 카카오톡 로그인 */}
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="relative bg-[#FEE500] text-black hover:bg-[#FEE500]/90 hover:text-black"
          >
            <span className="absolute left-4">
              <RiKakaoTalkFill className="size-6" />
            </span>
            <span className="flex-1 text-center">카카오톡으로 로그인</span>
          </AppFullButton>

          {/* 네이버 로그인 */}
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('naver')}
            className="relative bg-[#03A94D] text-white hover:bg-[#03A94D]/90"
          >
            <span className="absolute left-5">
              <SiNaver className="size-4" />
            </span>
            <span className="flex-1 text-center">네이버로 로그인</span>
          </AppFullButton>

          {/* 페이스북 로그인 */}
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="relative bg-[#4267b2] text-white hover:bg-[#4267b2]/90"
          >
            <span className="absolute left-4">
              <FaFacebookF className="size-6" />
            </span>
            <span className="flex-1 text-center">페이스북으로 로그인</span>
          </AppFullButton>

          {/* 애플 로그인 */}
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('apple')}
            className="relative bg-black text-white hover:bg-black/90"
          >
            <span className="absolute left-4">
              <FaApple className="size-6" />
            </span>
            <span className="flex-1 text-center">Apple로 로그인</span>
          </AppFullButton>
        </div>
      </div>
    </section>
  )
}
