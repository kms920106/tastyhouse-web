'use server'

import { emailVerificationRepository } from '@/domains/email-verification'
import { memberRepository } from '@/domains/member'
import { api } from '@/lib/api'

const SIGNUP_ENDPOINT = '/api/auth/signup'

export interface SignupPayload {
  username: string
  password: string
  fullName: string
  nickname: string
  phoneNumber: string
  birthDate: number
  gender: string
  referrerNickname?: string
  marketingInfoEnabled: boolean
  eventInfoEnabled: boolean
  pushNotificationEnabled: boolean
  emailVerifyToken: string
  phoneVerifyToken: string
}

export type SignupResult = {
  success: false
  error: string
}

export async function sendEmailVerificationCode(email: string) {
  return emailVerificationRepository.sendVerificationCode({ email })
}

export async function confirmEmailVerificationCode(email: string, verificationCode: string) {
  return emailVerificationRepository.confirmVerificationCode({ email, verificationCode })
}

export async function checkNicknameAvailability(nickname: string) {
  return memberRepository.checkNicknameAvailability(nickname)
}

export async function signup(payload: SignupPayload): Promise<SignupResult | null> {
  const { error } = await api.post<void>(SIGNUP_ENDPOINT, payload)

  if (error) {
    return { success: false, error: '회원가입에 실패했습니다. 다시 시도해 주세요.' }
  }

  return null
}
