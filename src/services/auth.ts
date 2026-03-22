'use server'

import { emailVerificationRepository } from '@/domains/email-verification'
import { memberService } from '@/domains/member'
import { api } from '@/lib/api'
import { redirect } from 'next/navigation'

const SIGNUP_ENDPOINT = '/api/auth/signup'

export interface SignupPayload {
  email: string
  password: string
  fullName: string
  nickname: string
  phoneNumber: string
  birthDate: number
  gender: string
  referrerNickname?: string
  marketingInfoEnabled: boolean
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

export async function checkNicknameDuplicate(nickname: string) {
  return memberService.checkNicknameDuplicate(nickname)
}

export async function signup(
  payload: SignupPayload,
  emailVerifyToken: string,
  phoneVerifyToken: string,
): Promise<SignupResult | void> {
  const { error } = await api.post<void>(SIGNUP_ENDPOINT, payload, {
    headers: {
      'X-Email-Verify-Token': emailVerifyToken,
      'X-Phone-Verify-Token': phoneVerifyToken,
    },
  })

  if (error) {
    return { success: false, error: '회원가입에 실패했습니다. 다시 시도해 주세요.' }
  }

  redirect('/auth/login')
}
