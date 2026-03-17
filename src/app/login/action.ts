'use server'

import { LoginRequest, LoginResponse, LoginResult } from '@/domains/member'
import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_LOGIN_ENDPOINT = '/api/auth/login'

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

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 외부 리다이렉트(토스페이먼츠) 허용
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  })
  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 외부 리다이렉트(토스페이먼츠) 허용
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  revalidatePath('/')
  redirect('/')
}
