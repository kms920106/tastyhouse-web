'use server'

import { api } from '@/lib/api'
import { redirect } from 'next/navigation'

const SIGNUP_ENDPOINT = '/api/auth/signup'
const EMAIL_VERIFICATION_ENDPOINT = '/api/auth/email-verification'
const NICKNAME_CHECK_ENDPOINT = '/api/members/v1/nickname/check'
const REFERRER_CHECK_ENDPOINT = '/api/members/v1/nickname/check'

export type SignupResult = {
  success: false
  error: string
}

export async function sendEmailVerificationCode(email: string) {
  return api.post<void>(EMAIL_VERIFICATION_ENDPOINT, { email })
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return api.post<{ emailVerifyToken: string }>(`${EMAIL_VERIFICATION_ENDPOINT}/confirm`, {
    email,
    verificationCode,
  })
}

export async function checkNicknameDuplicate(nickname: string) {
  return api.get<{ available: boolean }>(NICKNAME_CHECK_ENDPOINT, { params: { nickname } })
}

export async function checkReferrerNickname(nickname: string) {
  return api.get<{ available: boolean }>(REFERRER_CHECK_ENDPOINT, { params: { nickname } })
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

  const { error } = await api.post<void>(
    SIGNUP_ENDPOINT,
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
    {
      headers: {
        'X-Email-Verify-Token': emailVerifyToken,
        'X-Phone-Verify-Token': phoneVerifyToken,
      },
    },
  )

  if (error) {
    return { success: false, error: '회원가입에 실패했습니다. 다시 시도해 주세요.' }
  }

  redirect('/auth/login')
}
