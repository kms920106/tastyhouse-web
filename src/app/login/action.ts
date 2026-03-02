'use server'

import type { LoginParams, LoginRequest, LoginResponse, LoginResult } from '@/domains/member'
import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 입력 검증 함수 분리
function validateLoginInput(username: string, password: string): string | null {
  if (!username?.trim()) {
    return '아이디를 입력해 주세요.'
  }
  if (!password?.trim()) {
    return '비밀번호를 입력해 주세요.'
  }
  if (username.length < 3) {
    return '아이디는 최소 3글자 이상이어야 합니다.'
  }
  if (password.length < 6) {
    return '비밀번호는 최소 6글자 이상이어야 합니다.'
  }
  return null
}

export async function login(params: LoginParams): Promise<LoginResult> {
  const { username, password } = params

  // 검증
  const validationError = validateLoginInput(username, password)
  if (validationError) {
    return { success: false, error: validationError }
  }

  // 쿠키 설정 중 발생 가능한 예외
  // revalidatePath 호출 중 예외
  // 이 try-catch가 없으면 예외 발생 시 전체 서버 액션이 실패하고 사용자는 "Internal Server Error"만 보게 됩니다.
  try {
    // API 호출
    const request = {
      username,
      password,
    } as LoginRequest
    const { data, error } = await api.post<LoginResponse>(API_ENDPOINTS.AUTH_LOGIN, request)

    if (error || !data) {
      return { success: false, error: error || '로그인에 실패했습니다.' }
    }

    // httpOnly 쿠키 설정 (서버에서만 가능)
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

    // 홈 페이지 캐시 재검증
    revalidatePath('/', 'layout')

    return { success: true, data }
  } catch (error) {
    console.error('[Server Action] Login error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
    }
  }
}

// redirect를 사용하는 Server Action (form action으로 직접 사용 가능)
export async function loginAndRedirect(params: LoginParams) {
  const result = await login(params)

  if (!result.success) {
    return result
  }

  // redirect는 try/catch 외부에서만 사용 (throws를 이용한 제어 흐름)
  redirect('/')
}
