'use server'

import { api } from '@/lib/api'
import * as authService from '@/services/auth'

export async function sendEmailVerificationCode(email: string) {
  return authService.sendEmailVerificationCode(email)
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return authService.confirmEmailVerificationCode(email, verificationCode)
}

export async function resetForgotPassword(
  data: { newPassword: string; newPasswordConfirm: string },
  emailVerifyToken: string,
) {
  return api.put<void>('/api/members/v1/password/reset', data, {
    headers: { 'X-Email-Verify-Token': emailVerifyToken },
  })
}
