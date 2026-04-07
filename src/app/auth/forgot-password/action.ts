'use server'

import { api } from '@/lib/api'

const BASE = '/api/auth/v1/password-reset'

export async function requestPasswordReset(username: string) {
  return api.post<void>(`${BASE}/request`, { username })
}

export async function verifyPasswordReset(username: string, verificationCode: string) {
  return api.post<{ passwordResetToken: string }>(`${BASE}/verify`, { username, verificationCode })
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
  return api.post<void>(`${BASE}/confirm`, { passwordResetToken, newPassword, newPasswordConfirm })
}
