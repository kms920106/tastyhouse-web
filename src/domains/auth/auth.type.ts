import type { Gender } from '@/domains/member'

export type SocialProvider = 'KAKAO' | 'NAVER' | 'FACEBOOK' | 'APPLE'

export type SocialLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export type SocialLinkStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

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

export interface PasswordResetRequest {
  username: string
}

export interface PasswordResetVerifyRequest {
  username: string
  verificationCode: string
}

export interface PasswordResetVerifyResponse {
  passwordResetToken: string
}

export interface PasswordResetConfirmRequest {
  passwordResetToken: string
  newPassword: string
  newPasswordConfirm: string
}

export interface SocialProfile {
  providerId: string
  email: string | null
  nickname: string | null
  profileImageUrl: string | null
  name: string | null
  phoneNumber: string | null
  gender: Gender | null
  birthYear: string | null
  birthMonth: string | null
  birthDay: string | null
}

export interface JwtResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface SocialLoginResponse {
  status: SocialLoginStatus
  tempToken: string | null
  jwt: JwtResponse | null
}

export interface SocialLinkResponse {
  status: SocialLinkStatus
  tempToken: string | null
  jwt: JwtResponse | null
  socialProfile: SocialProfile | null
}

export interface SocialSignUpResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export interface PhoneLoginRequest {
  phoneVerifyToken: string
}

export interface PhoneLoginResponse {
  needsSignUp: boolean
  jwt: JwtResponse | null
}

// 소셜 계정 연동 (공통)
export interface SocialAccountLinkRequest {
  provider: SocialProvider
  tempToken: string
  phoneVerifyToken: string
}

// 카카오
export interface KakaoLoginRequest {
  code: string
}

// 네이버
export interface NaverLoginRequest {
  code: string
  state: string
}

// 페이스북
export interface FacebookLoginRequest {
  accessToken: string
}

// 애플
export interface AppleLoginRequest {
  code: string
  idToken: string
}

// 소셜 회원가입 (공통)
export interface SocialSignUpRequest {
  provider: SocialProvider
  tempToken: string
  username: string
  nickname: string
  fullName: string
  gender: Gender
  birthDate: number
  phoneNumber: string
  pushNotificationEnabled?: boolean
  marketingInfoEnabled?: boolean
  eventInfoEnabled?: boolean
  referrerNickname?: string
}
