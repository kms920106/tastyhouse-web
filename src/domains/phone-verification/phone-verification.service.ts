import { phoneVerificationRepository } from './phone-verification.repository'
import { ConfirmVerificationCodeRequest, SendVerificationCodeRequest } from './phone-verification.type'

export const phoneVerificationService = {
  async sendVerificationCode(data: SendVerificationCodeRequest) {
    return await phoneVerificationRepository.sendVerificationCode(data)
  },
  async confirmVerificationCode(data: ConfirmVerificationCodeRequest) {
    return await phoneVerificationRepository.confirmVerificationCode(data)
  },
}
