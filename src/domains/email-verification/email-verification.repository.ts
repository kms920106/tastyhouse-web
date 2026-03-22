import { api } from '@/lib/api'
import {
  ConfirmEmailVerificationCodeRequest,
  EmailVerifyTokenResponse,
  SendEmailVerificationCodeRequest,
} from './email-verification.type'

const ENDPOINT = '/api/email-verifications'

export const emailVerificationRepository = {
  // 인증 코드 발송
  async sendVerificationCode(data: SendEmailVerificationCodeRequest) {
    return api.post<void>(`${ENDPOINT}/v1/send`, data)
  },
  // 인증 코드 확인
  async confirmVerificationCode(data: ConfirmEmailVerificationCodeRequest) {
    return api.post<EmailVerifyTokenResponse>(`${ENDPOINT}/v1/confirm`, data)
  },
}
