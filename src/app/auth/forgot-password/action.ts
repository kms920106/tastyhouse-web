'use server'

import { api } from '@/lib/api'

const BASE = '/api/auth/v1/password-reset'

export async function requestPasswordReset(username: string) {
  return api.post<void>(`${BASE}/request`, { username })
}

export async function verifyPasswordReset(username: string, verificationCode: string) {
  return api.post<{ passwordResetToken: string }>(`${BASE}/verify`, { username, verificationCode })
}

export async function confirmPasswordReset(
  passwordResetToken: string,
  newPassword: string,
  newPasswordConfirm: string,
) {
  return api.post<void>(`${BASE}/confirm`, { passwordResetToken, newPassword, newPasswordConfirm })
}
