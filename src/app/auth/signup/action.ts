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
  const passwordConfirm = formData.get('passwordConfirm')?.toString() ?? ''
  const fullName = formData.get('fullName')?.toString() ?? ''
  const nickname = formData.get('nickname')?.toString() ?? ''
  const phoneNumber = formData.get('phoneNumber')?.toString() ?? ''
  const birthDate = formData.get('birthDate')?.toString() ?? ''
  const gender = formData.get('gender')?.toString() ?? ''
  const referrerNickname = formData.get('referrerNickname')?.toString() ?? ''
  const emailVerifyToken = formData.get('emailVerifyToken')?.toString() ?? ''
  const phoneVerifyToken = formData.get('phoneVerifyToken')?.toString() ?? ''
  const agreedTerms = formData.get('agreedTerms') === 'true'
  const agreedPrivacy = formData.get('agreedPrivacy') === 'true'
  const agreedFinance = formData.get('agreedFinance') === 'true'
  const agreedAge = formData.get('agreedAge') === 'true'
  const agreedMarketing = formData.get('agreedMarketing') === 'true'

  if (!email.trim()) return { success: false, error: '이메일을 입력해 주세요.' }
  if (!emailVerifyToken) return { success: false, error: '이메일 인증을 완료해 주세요.' }
  if (!password.trim()) return { success: false, error: '비밀번호를 입력해 주세요.' }
  if (password !== passwordConfirm) return { success: false, error: '비밀번호가 일치하지 않습니다.' }
  if (!fullName.trim()) return { success: false, error: '이름을 입력해 주세요.' }
  if (!nickname.trim()) return { success: false, error: '닉네임을 입력해 주세요.' }
  if (!phoneNumber.trim()) return { success: false, error: '휴대폰 번호를 입력해 주세요.' }
  if (!phoneVerifyToken) return { success: false, error: '휴대폰 인증을 완료해 주세요.' }
  if (!birthDate) return { success: false, error: '생년월일을 선택해 주세요.' }
  if (!gender) return { success: false, error: '성별을 선택해 주세요.' }
  if (!agreedTerms || !agreedPrivacy || !agreedFinance || !agreedAge) {
    return { success: false, error: '필수 약관에 동의해 주세요.' }
  }

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
