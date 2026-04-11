import { api } from '@/lib/api'
import {
  AppleAccountLinkPayload,
  AppleLinkAccountResponse,
  AppleLoginPayload,
  AppleLoginResponse,
  AppleSignUpPayload,
  AppleSignUpResponse,
  FacebookAccountLinkPayload,
  FacebookLinkAccountResponse,
  FacebookLoginPayload,
  FacebookLoginResponse,
  FacebookSignUpPayload,
  FacebookSignUpResponse,
  KakaoAccountLinkPayload,
  KakaoLinkAccountResponse,
  KakaoLoginPayload,
  KakaoLoginResponse,
  KakaoSignUpPayload,
  KakaoSignUpResponse,
  LoginRequest,
  LoginResponse,
  NaverAccountLinkPayload,
  NaverLinkAccountResponse,
  NaverLoginPayload,
  NaverLoginResponse,
  NaverSignUpPayload,
  NaverSignUpResponse,
  PasswordResetConfirmPayload,
  PasswordResetVerifyPayload,
  PasswordResetVerifyResponse,
  PhoneLoginPayload,
  PhoneLoginResponse,
} from './auth.type'

const AUTH_BASE = '/api/auth/v1'
const PASSWORD_RESET_BASE = `${AUTH_BASE}/password-reset`

export const authRepository = {
  async login(payload: LoginRequest) {
    return api.post<LoginResponse>(`${AUTH_BASE}/login`, payload)
  },

  async logout() {
    return api.post(`${AUTH_BASE}/logout`)
  },

  async requestPasswordReset(username: string) {
    return api.post<void>(`${PASSWORD_RESET_BASE}/request`, { username })
  },

  async verifyPasswordReset(payload: PasswordResetVerifyPayload) {
    return api.post<PasswordResetVerifyResponse>(`${PASSWORD_RESET_BASE}/verify`, payload)
  },

  async confirmPasswordReset(payload: PasswordResetConfirmPayload) {
    return api.post<void>(`${PASSWORD_RESET_BASE}/confirm`, payload)
  },

  async kakaoLogin(payload: KakaoLoginPayload) {
    return api.post<KakaoLoginResponse>(`${AUTH_BASE}/login/kakao`, payload)
  },

  async kakaoLinkAccount(payload: KakaoAccountLinkPayload) {
    return api.post<KakaoLinkAccountResponse>(`${AUTH_BASE}/link/kakao`, payload)
  },

  async kakaoSignUp(payload: KakaoSignUpPayload) {
    return api.post<KakaoSignUpResponse>(`${AUTH_BASE}/signup/kakao`, payload)
  },

  async phoneLogin(payload: PhoneLoginPayload) {
    return api.post<PhoneLoginResponse>(`${AUTH_BASE}/login/phone`, payload)
  },

  async naverLogin(payload: NaverLoginPayload) {
    return api.post<NaverLoginResponse>(`${AUTH_BASE}/login/naver`, payload)
  },

  async naverLinkAccount(payload: NaverAccountLinkPayload) {
    return api.post<NaverLinkAccountResponse>(`${AUTH_BASE}/link/naver`, payload)
  },

  async naverSignUp(payload: NaverSignUpPayload) {
    return api.post<NaverSignUpResponse>(`${AUTH_BASE}/signup/naver`, payload)
  },

  async facebookLogin(payload: FacebookLoginPayload) {
    return api.post<FacebookLoginResponse>(`${AUTH_BASE}/login/facebook`, payload)
  },

  async facebookLinkAccount(payload: FacebookAccountLinkPayload) {
    return api.post<FacebookLinkAccountResponse>(`${AUTH_BASE}/link/facebook`, payload)
  },

  async facebookSignUp(payload: FacebookSignUpPayload) {
    return api.post<FacebookSignUpResponse>(`${AUTH_BASE}/signup/facebook`, payload)
  },

  async appleLogin(payload: AppleLoginPayload) {
    return api.post<AppleLoginResponse>(`${AUTH_BASE}/login/apple`, payload)
  },

  async appleLinkAccount(payload: AppleAccountLinkPayload) {
    return api.post<AppleLinkAccountResponse>(`${AUTH_BASE}/link/apple`, payload)
  },

  async appleSignUp(payload: AppleSignUpPayload) {
    return api.post<AppleSignUpResponse>(`${AUTH_BASE}/signup/apple`, payload)
  },
}
