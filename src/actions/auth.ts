'use server'

import { LoginRequest, LoginResponse, LoginResult } from '@/domains/member'
import { api } from '@/lib/api'
import { AUTH_COOKIE_KEYS, TOKEN_MAX_AGE, getTokenMaxAge } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_LOGIN_ENDPOINT = '/api/auth/v1/login'
const AUTH_LOGOUT_ENDPOINT = '/api/auth/v1/logout'
const PASSWORD_RESET_BASE = '/api/auth/v1/password-reset'

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

  const validationError = validateLoginInput(username, password)
  if (validationError) {
    return { success: false, error: validationError }
  }

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
    sameSite: 'lax' as const,
    path: '/',
  }

  const tokenMaxAge = getTokenMaxAge(rememberMe)

  cookieStore.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, data.accessToken, {
    ...baseOptions,
    ...(rememberMe ? { maxAge: tokenMaxAge.accessToken } : {}),
  })
  cookieStore.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, data.refreshToken, {
    ...baseOptions,
    ...(rememberMe ? { maxAge: tokenMaxAge.refreshToken } : {}),
  })

  if (rememberMe) {
    cookieStore.set(AUTH_COOKIE_KEYS.REMEMBER_ME, 'true', {
      ...baseOptions,
      httpOnly: false,
      maxAge: TOKEN_MAX_AGE.REMEMBER_ME,
    })
  }

  revalidatePath('/')
  redirect('/')
}

export async function logout() {
  try {
    await api.post(AUTH_LOGOUT_ENDPOINT)

    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE_KEYS.ACCESS_TOKEN)
    cookieStore.delete(AUTH_COOKIE_KEYS.REFRESH_TOKEN)

    revalidatePath('/', 'layout')
  } catch (error) {
    console.error('[Server Action] Logout error:', error)
  }

  redirect(PAGE_PATHS.HOME)
}

export async function requestPasswordReset(username: string) {
  return api.post<void>(`${PASSWORD_RESET_BASE}/request`, { username })
}

export async function verifyPasswordReset(username: string, verificationCode: string) {
  return api.post<{ passwordResetToken: string }>(`${PASSWORD_RESET_BASE}/verify`, {
    username,
    verificationCode,
  })
}

export async function verifyPasswordResetForEmailField(
  email: string,
  verificationCode: string,
): Promise<{ error?: string; data?: { token: string } } | null> {
  const response = await verifyPasswordReset(email, verificationCode)
  if (!response || response.error) return response as { error: string } | null
  const token = response.data?.passwordResetToken
  return { data: { token: token ?? '' } }
}

export async function confirmPasswordReset(
  passwordResetToken: string,
  newPassword: string,
  newPasswordConfirm: string,
) {
  return api.post<void>(`${PASSWORD_RESET_BASE}/confirm`, {
    passwordResetToken,
    newPassword,
    newPasswordConfirm,
  })
}
