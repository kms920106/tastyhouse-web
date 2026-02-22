import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  ConfirmVerificationCodeRequest,
  PhoneVerifyTokenResponse,
  SendVerificationCodeRequest,
} from './phone-verification.type'

const ENDPOINT = '/api/phone-verifications'

export const phoneVerificationRepository = {
  // 인증번호 발송
  async sendVerificationCode(data: SendVerificationCodeRequest) {
    return api.post<ApiResponse<void>>(`${ENDPOINT}/v1/send`, data)
  },
  // 인증번호 확인
  async confirmVerificationCode(data: ConfirmVerificationCodeRequest) {
    return api.post<ApiResponse<PhoneVerifyTokenResponse>>(`${ENDPOINT}/v1/confirm`, data)
  },
}
