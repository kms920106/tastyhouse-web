'use server'

import * as authService from '@/services/auth'
import type { SignupResult } from '@/services/auth'
import { signup } from '@/services/auth'

export type { SignupResult }

export async function sendEmailVerificationCode(email: string) {
  return authService.sendEmailVerificationCode(email)
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return authService.confirmEmailVerificationCode(email, verificationCode)
}

export async function checkNicknameDuplicate(nickname: string) {
  return authService.checkNicknameDuplicate(nickname)
}

export async function signupFormAction(
  _prevState: SignupResult | null,
  formData: FormData,
): Promise<SignupResult> {
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const fullName = formData.get('fullName')?.toString() ?? ''
  const nickname = formData.get('nickname')?.toString() ?? ''
  const phoneNumber = formData.get('phoneNumber')?.toString() ?? ''
  const birthYear = formData.get('birthYear')?.toString() ?? ''
  const birthMonth = formData.get('birthMonth')?.toString().padStart(2, '0') ?? ''
  const birthDay = formData.get('birthDay')?.toString().padStart(2, '0') ?? ''
  const birthDate =
    birthYear && birthMonth && birthDay ? `${birthYear}${birthMonth}${birthDay}` : ''
  const gender = formData.get('gender')?.toString() ?? ''
  const referrerNickname = formData.get('referrerNickname')?.toString() ?? ''
  const emailVerifyToken = formData.get('emailVerifyToken')?.toString() ?? ''
  const phoneVerifyToken = formData.get('phoneVerifyToken')?.toString() ?? ''
  const agreedMarketing = formData.has('agreedMarketing')

  const result = await signup(
    {
      email,
      password,
      fullName,
      nickname,
      phoneNumber,
      birthDate: Number(birthDate),
      gender,
      referrerNickname: referrerNickname || undefined,
      marketingInfoEnabled: agreedMarketing,
    },
    emailVerifyToken,
    phoneVerifyToken,
  )

  if (result) return result

  return { success: false, error: '회원가입에 실패했습니다. 다시 시도해 주세요.' }
}
