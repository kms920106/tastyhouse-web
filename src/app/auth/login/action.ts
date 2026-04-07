'use server'

import { LoginRequest, LoginResponse, LoginResult } from '@/domains/member'
import { api } from '@/lib/api'
import { AUTH_COOKIE_KEYS, TOKEN_MAX_AGE, getTokenMaxAge } from '@/lib/auth-config'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_LOGIN_ENDPOINT = '/api/auth/v1/login'

// 입력 검증 함수 분리
function validateLoginInput(username: string, password: string): string | null {
  if (!username?.trim()) {
    return '아이디를 입력해 주세요.'
  }
  if (!password?.trim()) {
    return '비밀번호를 입력해 주세요.'
  }
  return null
}

export async function loginFormAction(
  _prevState: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const username = formData.get('username')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const rememberMe = formData.get('rememberMe') === 'true'

  // 검증
  const validationError = validateLoginInput(username, password)
  if (validationError) {
    return { success: false, error: validationError }
  }

  // API 호출
  const request = {
    username,
    password,
  } as LoginRequest
  const { data, error } = await api.post<LoginResponse>(AUTH_LOGIN_ENDPOINT, request)

  if (error || !data) {
    return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' }
  }

  const cookieStore = await cookies()
  const baseOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const, // 외부 리다이렉트(토스페이먼츠) 허용
    path: '/',
  }

  const tokenMaxAge = getTokenMaxAge(rememberMe)

  cookieStore.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, data.accessToken, {
    ...baseOptions,
    // rememberMe: 30일 / 일반: 세션 쿠키 (브라우저 닫으면 소멸)
    ...(rememberMe ? { maxAge: tokenMaxAge.accessToken } : {}),
  })
  cookieStore.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {
    ...baseOptions,
    // rememberMe: 30일 / 일반: 세션 쿠키 (브라우저 닫으면 소멸)
    ...(rememberMe ? { maxAge: tokenMaxAge.refreshToken } : {}),
  })

  // 미들웨어에서 토큰 갱신 시 동일한 maxAge 적용을 위해 rememberMe 상태 저장
  if (rememberMe) {
    cookieStore.set(AUTH_COOKIE_KEYS.REMEMBER_ME, 'true', {
      ...baseOptions,
      httpOnly: false, // JS에서 읽을 필요는 없으나 미들웨어(Next.js Edge)에서 읽기 위해 non-httpOnly
      maxAge: TOKEN_MAX_AGE.REMEMBER_ME,
    })
  }

  revalidatePath('/')
  redirect('/')
}
