export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export type LoginResult = {
  success: false
  error: string
}

export interface PasswordResetRequestPayload {
  username: string
}

export interface PasswordResetVerifyPayload {
  username: string
  verificationCode: string
}

export interface PasswordResetVerifyResponse {
  passwordResetToken: string
}

export interface PasswordResetConfirmPayload {
  passwordResetToken: string
  newPassword: string
  newPasswordConfirm: string
}

export interface KakaoLoginPayload {
  code: string
}

export interface KakaoProfile {
  providerId: string
  email: string
  nickname: string
  profileImageUrl: string
  name: string | null
  phoneNumber: string | null
}

export interface KakaoLoginResponse {
  needsSignUp: boolean
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  kakaoProfile: KakaoProfile | null
}

export type Gender = 'MALE' | 'FEMALE'

export interface KakaoSignUpPayload {
  code: string
  nickname: string
  fullName: string
  gender: Gender
  birthDate: number
  phoneNumber?: string
  phoneVerifyToken?: string
  pushNotificationEnabled?: boolean
  marketingInfoEnabled?: boolean
  eventInfoEnabled?: boolean
  referrerNickname?: string
}

export interface KakaoSignUpResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}
