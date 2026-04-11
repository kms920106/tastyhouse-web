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
  kakaoTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  kakaoProfile: KakaoProfile | null
}

export interface KakaoAccountLinkPayload {
  kakaoTempToken: string
  phoneVerifyToken: string
}

export type KakaoLinkAccountStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

export interface KakaoLinkAccountResponse {
  status: KakaoLinkAccountStatus
  kakaoTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  kakaoProfile: KakaoProfile | null
}

export type Gender = 'MALE' | 'FEMALE'

export interface KakaoSignUpPayload {
  kakaoTempToken: string
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

// 네이버 로그인
export interface NaverLoginPayload {
  code: string
  state: string
}

export type NaverLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export interface NaverProfile {
  providerId: string
  email: string
  nickname: string
  profileImageUrl: string
  name: string | null
  phoneNumber: string | null
}

export interface NaverLoginResponse {
  status: NaverLoginStatus
  naverTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  naverProfile: NaverProfile | null
}

export interface NaverAccountLinkPayload {
  naverTempToken: string
  phoneVerifyToken: string
}

export type NaverLinkAccountStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

export interface NaverLinkAccountResponse {
  status: NaverLinkAccountStatus
  naverTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  naverProfile: NaverProfile | null
}

export interface NaverSignUpPayload {
  naverTempToken: string
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

export interface NaverSignUpResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

// 페이스북 로그인
export interface FacebookLoginPayload {
  accessToken: string
}

export type FacebookLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export interface FacebookProfile {
  providerId: string
  email: string
  nickname: string
  profileImageUrl: string
  name: string | null
  phoneNumber: string | null
}

export interface FacebookLoginResponse {
  status: FacebookLoginStatus
  facebookTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  facebookProfile: FacebookProfile | null
}

export interface FacebookAccountLinkPayload {
  facebookTempToken: string
  phoneVerifyToken: string
}

export type FacebookLinkAccountStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

export interface FacebookLinkAccountResponse {
  status: FacebookLinkAccountStatus
  facebookTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  facebookProfile: FacebookProfile | null
}

export interface FacebookSignUpPayload {
  facebookTempToken: string
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

export interface FacebookSignUpResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

// 애플 로그인
export interface AppleLoginPayload {
  code: string
  idToken: string
}

export type AppleLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export interface AppleProfile {
  providerId: string
  email: string
  nickname: string
  profileImageUrl: string
  name: string | null
  phoneNumber: string | null
}

export interface AppleLoginResponse {
  status: AppleLoginStatus
  appleTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  appleProfile: AppleProfile | null
}

export interface AppleAccountLinkPayload {
  appleTempToken: string
  phoneVerifyToken: string
}

export type AppleLinkAccountStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

export interface AppleLinkAccountResponse {
  status: AppleLinkAccountStatus
  appleTempToken: string | null
  jwt: { accessToken: string; refreshToken: string; tokenType: string } | null
  appleProfile: AppleProfile | null
}

export interface AppleSignUpPayload {
  appleTempToken: string
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

export interface AppleSignUpResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}
