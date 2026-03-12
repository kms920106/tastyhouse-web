'use client'

import { loginAndRedirect } from '@/app/login/action'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import type { LoginParams } from '@/domains/member'
import { useRouter } from 'next/navigation'
import { useActionState, useState } from 'react'

export default function LoginPage() {
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
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="flex items-center justify-center relative px-4 border-b border-gray-100 h-[55px]">
        <button
          onClick={() => router.back()}
          className="absolute left-4 w-[55px] h-[55px] flex items-center justify-center cursor-pointer"
          aria-label="닫기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <h1 className="text-lg">로그인</h1>
      </header>

      {/* 로그인 폼 */}
      <div className="px-6 pt-8">
        {state && !state.success && (
          <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg" role="alert">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          {/* 아이디 입력 */}
          <input
            id="username"
            name="username"
            type="text"
            placeholder="아이디(이메일주소)를 입력해 주세요."
            required
            minLength={3}
            className="w-full px-4 py-4 border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
          />

          {/* 비밀번호 입력 */}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            required
            minLength={6}
            className="w-full px-4 py-4 border border-gray-200 rounded-lg text-base placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
          />

          {/* 로그인 상태 유지 */}
          <div className="flex items-center gap-2 py-2">
            <CircleCheckbox checked={keepLoggedIn} onChange={setKeepLoggedIn} />
            <label
              onClick={() => setKeepLoggedIn((prev) => !prev)}
              className="text-base text-gray-600 cursor-pointer"
            >
              로그인 상태 유지
            </label>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-[#F8B4B4] text-white text-base rounded-lg disabled:opacity-70"
          >
            {isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* 회원가입 / 비밀번호 찾기 */}
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-600">
          <button onClick={() => router.push('/signup')} className="hover:text-gray-900">
            회원가입
          </button>
          <span className="text-gray-300">|</span>
          <button onClick={() => router.push('/forgot-password')} className="hover:text-gray-900">
            비밀번호 찾기
          </button>
        </div>

        {/* 소셜 로그인 */}
        <div className="mt-12 space-y-3">
          {/* 카카오 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('kakao')}
            className="w-full py-4 bg-[#FEE500] text-[#3C1E1E] rounded-lg flex items-center justify-center gap-3 text-base"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.75 3 2.5 6.37 2.5 10.5c0 2.63 1.77 4.93 4.42 6.24-.18.66-.68 2.49-.78 2.89-.12.47.17.46.36.33.15-.09 2.42-1.61 3.18-2.12.47.07.96.1 1.46.10 5.25 0 9.5-3.37 9.5-7.5S17.25 3 12 3z" />
            </svg>
            카카오톡으로 로그인
          </button>

          {/* 네이버 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('naver')}
            className="w-full py-4 bg-[#03C75A] text-white rounded-lg flex items-center justify-center gap-3 text-base"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
            </svg>
            네이버로 로그인
          </button>

          {/* 페이스북 */}
          <button
            type="button"
            onClick={() => handleSocialLogin('facebook')}
            className="w-full py-4 bg-[#1877F2] text-white rounded-lg flex items-center justify-center gap-3 text-base"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            페이스북으로 로그인
          </button>
        </div>
      </div>
    </div>
  )
}
