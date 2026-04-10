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

export type KakaoLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export interface KakaoProfile {
  providerId: string
  email: string
  nickname: string
  profileImageUrl: string
  name: string | null
  phoneNumber: string | null
}

export interface KakaoLoginResponse {
  status: KakaoLoginStatus
  kakaoAccessToken: string
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  kakaoProfile: KakaoProfile | null
}

export interface KakaoAccountLinkPayload {
  accessToken: string
  phoneVerifyToken: string
}

export type Gender = 'MALE' | 'FEMALE'

export interface KakaoSignUpPayload {
  kakaoAccessToken: string
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

export interface PhoneLoginPayload {
  phoneVerifyToken: string
}

export interface PhoneLoginResponse {
  needsSignUp: boolean
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
}
