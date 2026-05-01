import 'server-only'
import { api } from '@/lib/api'
import {
  ConfirmEmailVerificationCodeRequest,
  EmailVerifyTokenResponse,
  SendEmailVerificationCodeRequest,
} from './email-verification.dto'

const ENDPOINT = '/api/email-verifications'

export const emailVerificationRepository = {
  async sendVerificationCode(data: SendEmailVerificationCodeRequest) {
    return api.post<void>(`${ENDPOINT}/v1/send`, data)
  },
  async confirmVerificationCode(data: ConfirmEmailVerificationCodeRequest) {
    return api.post<EmailVerifyTokenResponse>(`${ENDPOINT}/v1/confirm`, data)
  },
}
