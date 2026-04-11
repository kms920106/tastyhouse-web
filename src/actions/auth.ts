'use server'

import { authRepository, KakaoLoginResponse, KakaoSignUpPayload, LoginResult } from '@/domains/auth'
import { AUTH_COOKIE_KEYS, getTokenMaxAge, TOKEN_MAX_AGE } from '@/lib/auth-config'
import { PAGE_PATHS } from '@/lib/paths'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

  const { data, error } = await authRepository.login({ username, password })

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

  const { accessToken, refreshToken } = data

  cookieStore.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    ...baseOptions,
    ...(rememberMe ? { maxAge: tokenMaxAge.accessToken } : {}),
  })
  cookieStore.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
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
    await authRepository.logout()

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
  return authRepository.requestPasswordReset(username)
}

export async function verifyPasswordReset(username: string, verificationCode: string) {
  return authRepository.verifyPasswordReset({ username, verificationCode })
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
  return authRepository.confirmPasswordReset({
    passwordResetToken,
    newPassword,
    newPasswordConfirm,
  })
}

async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  const baseOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  }
  cookieStore.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, baseOptions)
  cookieStore.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, baseOptions)
}

export type KakaoLinkAccountResult =
  | { success: true; status: 'LOGIN' }
  | {
      success: true
      status: 'NEEDS_SIGN_UP'
      kakaoTempToken: string
      kakaoProfile: KakaoLoginResponse['kakaoProfile']
    }
  | { success: false; error: string }

export async function kakaoLinkAccountAction(
  kakaoTempToken: string,
  phoneVerifyToken: string,
): Promise<KakaoLinkAccountResult> {
  const { data, error } = await authRepository.kakaoLinkAccount({
    kakaoTempToken,
    phoneVerifyToken,
  })

  if (error || !data) {
    return { success: false, error: '카카오 계정 연동에 실패했습니다. 다시 시도해 주세요.' }
  }

  const { status, jwt, kakaoProfile } = data

  // 기존 일반 계정과 카카오 계정 연동이 완료되었으므로 JWT를 쿠키에 저장하고 로그인 처리한다.
  if (status === 'LOGIN' && jwt) {
    await setAuthCookies(jwt.accessToken, jwt.refreshToken)
    revalidatePath('/')
    return { success: true, status: 'LOGIN' }
  }

  // 해당 전화번호로 가입된 계정이 없는 신규 고객이므로 회원가입 페이지로 안내한다.
  if (status === 'NEEDS_SIGN_UP' && kakaoTempToken && kakaoProfile) {
    return {
      success: true,
      status: 'NEEDS_SIGN_UP',
      kakaoTempToken,
      kakaoProfile,
    }
  }

  return { success: false, error: '카카오 계정 연동에 실패했습니다. 다시 시도해 주세요.' }
}

export type PhoneLoginResult =
  | { success: true; needsSignUp: false }
  | { success: true; needsSignUp: true }
  | { success: false; error: string }

export async function phoneLoginAction(phoneVerifyToken: string): Promise<PhoneLoginResult> {
  const { data, error } = await authRepository.phoneLogin({ phoneVerifyToken })

  if (error || !data) {
    return { success: false, error: '휴대폰 인증 로그인에 실패했습니다. 다시 시도해 주세요.' }
  }

  const { needsSignUp, jwt } = data

  if (!needsSignUp && jwt) {
    await setAuthCookies(jwt.accessToken, jwt.refreshToken)
    revalidatePath('/')
    return { success: true, needsSignUp: false }
  }

  return { success: true, needsSignUp: true }
}

export type KakaoSignUpResult = { success: false; error: string }

export async function kakaoSignUpAction(
  payload: KakaoSignUpPayload,
): Promise<KakaoSignUpResult | null> {
  const { data, error } = await authRepository.kakaoSignUp(payload)

  if (error || !data) {
    return { success: false, error: '카카오 회원가입에 실패했습니다. 다시 시도해 주세요.' }
  }

  const { accessToken, refreshToken } = data

  await setAuthCookies(accessToken, refreshToken)
  revalidatePath('/')
  return null
}
