'use server'

import * as authService from '@/services/auth'
import type { SignupResult } from '@/services/auth'
import { signup } from '@/services/auth'
import { redirect } from 'next/navigation'

export type { SignupResult }

export async function sendEmailVerificationCode(email: string) {
  return authService.sendEmailVerificationCode(email)
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return authService.confirmEmailVerificationCode(email, verificationCode)
}

export async function checkNicknameAvailability(nickname: string) {
  return authService.checkNicknameAvailability(nickname)
}

export async function signupFormAction(
  _prevState: SignupResult | null,
  formData: FormData,
): Promise<SignupResult> {
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const fullName = formData.get('fullName')?.toString() ?? ''
  const nickname = formData.get('nickname')?.toString() ?? ''
  const phoneNumber = (formData.get('phoneNumber')?.toString() ?? '').replace(/-/g, '')
  const birthYear = formData.get('birthYear')?.toString() ?? ''
  const birthMonth = formData.get('birthMonth')?.toString().padStart(2, '0') ?? ''
  const birthDay = formData.get('birthDay')?.toString().padStart(2, '0') ?? ''
  const birthDate =
    birthYear && birthMonth && birthDay ? `${birthYear}${birthMonth}${birthDay}` : ''
  const gender = formData.get('gender')?.toString() ?? ''
  const referrerNickname = formData.get('verifiedReferrerNickname')?.toString() ?? ''
  const emailVerifyToken = formData.get('emailVerifyToken')?.toString() ?? ''
  const phoneVerifyToken = formData.get('phoneVerifyToken')?.toString() ?? ''
  const agreedMarketing = formData.has('agreedMarketing')
  const agreedPushNotification = formData.has('agreedPushNotification')

  const result = await signup({
    username: email,
    password,
    fullName,
    nickname,
    phoneNumber,
    birthDate: Number(birthDate),
    gender,
    referrerNickname: referrerNickname || undefined,
    marketingInfoEnabled: agreedMarketing,
    eventInfoEnabled: agreedMarketing,
    pushNotificationEnabled: agreedPushNotification,
    emailVerifyToken,
    phoneVerifyToken,
  })

  if (result) return result

  redirect('/auth/login')
}
