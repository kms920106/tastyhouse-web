import { cookies } from 'next/headers'

export const AUTH_COOKIE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  REMEMBER_ME: 'rememberMe',
} as const

export async function getIsLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get(AUTH_COOKIE_KEYS.ACCESS_TOKEN)
}

export async function getMemberIdFromToken(): Promise<number | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.ACCESS_TOKEN)?.value
  if (!accessToken) return null

  try {
    const payload = accessToken.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'))
    return typeof decoded.memberId === 'number' ? decoded.memberId : null
  } catch {
    return null
  }
}

export const TOKEN_MAX_AGE = {
  ACCESS_TOKEN: 60 * 60, // 1시간
  REFRESH_TOKEN: 60 * 60 * 24 * 7, // 7일
  REMEMBER_ME: 60 * 60 * 24 * 30, // 30일
} as const

export function getTokenMaxAge(rememberMe: boolean) {
  return {
    accessToken: rememberMe ? TOKEN_MAX_AGE.REMEMBER_ME : TOKEN_MAX_AGE.ACCESS_TOKEN,
    refreshToken: rememberMe ? TOKEN_MAX_AGE.REMEMBER_ME : TOKEN_MAX_AGE.REFRESH_TOKEN,
  }
}
