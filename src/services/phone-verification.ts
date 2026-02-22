'use server'

import {
  ConfirmVerificationCodeRequest,
  phoneVerificationService,
  SendVerificationCodeRequest,
} from '@/domains/phone-verification'

export async function sendPhoneVerificationCode(data: SendVerificationCodeRequest) {
  return await phoneVerificationService.sendVerificationCode(data)
}

export async function confirmPhoneVerificationCode(data: ConfirmVerificationCodeRequest) {
  return await phoneVerificationService.confirmVerificationCode(data)
}
