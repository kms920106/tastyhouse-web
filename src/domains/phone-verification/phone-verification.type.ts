export type SendVerificationCodeRequest = {
  phoneNumber: string
}

export type ConfirmVerificationCodeRequest = {
  phoneNumber: string
  verificationCode: string
}

export type PhoneVerifyTokenResponse = {
  phoneVerifyToken: string
}
