'use server'

import { authRepository } from '@/domains/auth/auth.repository'
import type { SignupRequest } from '@/domains/auth/auth.dto'
import { emailVerificationRepository } from '@/domains/email-verification/email-verification.repository'
import { memberRepository } from '@/domains/member'
import { policyRepository } from '@/domains/policy'
import { redirect } from 'next/navigation'

export type SignupResult = {
  success: false
  error: string
}

export async function fetchTermsOfServiceContent(): Promise<string> {
  const { data } = await policyRepository.getLatestTermsOfService()
  return data?.content ?? ''
}

export async function fetchPrivacyPolicyContent(): Promise<string> {
  const { data } = await policyRepository.getLatestPrivacyPolicy()
  return data?.content ?? ''
}

export async function fetchElectronicFinancialTransactionsContent(): Promise<string> {
  const { data } = await policyRepository.getLatestElectronicFinancialTransactions()
  return data?.content ?? ''
}

export async function fetchAgeVerificationContent(): Promise<string> {
  const { data } = await policyRepository.getLatestAgeVerification()
  return data?.content ?? ''
}

export async function sendEmailVerificationCode(email: string) {
  return emailVerificationRepository.sendVerificationCode({ email })
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return emailVerificationRepository.confirmVerificationCode({ email, verificationCode })
}

export async function confirmEmailVerificationCodeForEmailField(
  email: string,
  verificationCode: string,
): Promise<{ error?: string; data?: { token: string } } | null> {
  const response = await emailVerificationRepository.confirmVerificationCode({
    email,
    verificationCode,
  })
  if (!response || response.error) return response as { error: string } | null
  const token = response.data?.emailVerifyToken
  return { data: { token: token ?? '' } }
}

export async function checkNicknameAvailability(nickname: string) {
  return memberRepository.checkNicknameAvailability(nickname)
}

async function signup(payload: SignupRequest): Promise<SignupResult | null> {
  const { error } = await authRepository.signup(payload)

  if (error) {
    return { success: false, error: '회원가입에 실패했습니다. 다시 시도해 주세요.' }
  }

  return null
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

  redirect('/auth/signup/complete')
}
