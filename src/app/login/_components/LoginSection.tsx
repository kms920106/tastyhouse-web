'use client'

import { loginAndRedirect } from '@/app/login/action'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { CloseButton } from '@/components/layouts/header-parts'
import AppFullButton from '@/components/ui/AppFullButton'
import AppInputPassword from '@/components/ui/AppInputPassword'
import AppInputText from '@/components/ui/AppInputText'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import type { LoginParams } from '@/domains/member'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'

export default function LoginSection() {
  const router = useRouter()
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const username = formData.get('username')?.toString() || ''
      const password = formData.get('password')?.toString() || ''
      const params = { username, password } satisfies LoginParams
      return await loginAndRedirect(params)
    },
    null,
  )

  const handleSocialLogin = (provider: string) => {
    alert(provider)
    // TODO: 소셜 로그인 구현
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
        {state && !state.success && (
          <div
            className="mb-4 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
          >
            {state.error}
          </div>
        )}
        <form action={formAction}>
          <div className="space-y-4">
            <AppInputText
              id="username"
              name="username"
              placeholder="아이디(이메일주소)를 입력해 주세요."
              required
              minLength={3}
            />
            <AppInputPassword
              id="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요."
              required
              minLength={6}
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <CircleCheckbox checked={keepLoggedIn} onChange={setKeepLoggedIn} />
              <span className="text-sm leading-[14px] text-[#666666]">로그인 상태 유지</span>
            </label>
          </div>
          <div className="mt-[30px]">
            <AppPrimaryButton type="submit" disabled={isPending}>
              {isPending ? '로그인 중...' : '로그인'}
            </AppPrimaryButton>
          </div>
        </form>
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={() => router.push('/signup')}
            className="text-sm leading-[14px] text-[#666666]"
          >
            회원가입
          </button>
          <span className="text-sm leading-[14px] text-[#666666]">|</span>
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-sm leading-[14px] text-[#666666]"
          >
            비밀번호 찾기
          </button>
        </div>
        <div className="mt-[60px] space-y-2.5">
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="relative bg-[#FEE500] text-black"
          >
            <span className="absolute left-4">
              <RiKakaoTalkFill className="size-6" />
            </span>
            <span className="flex-1 text-center">카카오톡으로 로그인</span>
          </AppFullButton>
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('naver')}
            className="relative bg-[#03A94D] text-white"
          >
            <span className="absolute left-5">
              <SiNaver className="size-4" />
            </span>
            <span className="flex-1 text-center">네이버로 로그인</span>
          </AppFullButton>
          <AppFullButton
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="relative bg-[#4267b2] text-white"
          >
            <span className="absolute left-4">
              <FaFacebookF className="size-6" />
            </span>
            <span className="flex-1 text-center">페이스북으로 로그인</span>
          </AppFullButton>
        </div>
      </div>
    </section>
  )
}
