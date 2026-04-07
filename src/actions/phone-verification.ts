'use server'

import { memberRepository } from '@/domains/member'
import {
  ConfirmVerificationCodeRequest,
  phoneVerificationRepository,
  SendVerificationCodeRequest,
} from '@/domains/phone-verification'

export async function checkPhoneAvailability(phoneNumber: string) {
  return memberRepository.checkPhoneAvailability(phoneNumber)
}

export async function sendPhoneVerificationCode(data: SendVerificationCodeRequest) {
  return phoneVerificationRepository.sendVerificationCode(data)
}

export async function confirmPhoneVerificationCode(data: ConfirmVerificationCodeRequest) {
  return phoneVerificationRepository.confirmVerificationCode(data)
}
