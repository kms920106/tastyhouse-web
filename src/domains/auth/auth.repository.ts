import { api } from '@/lib/api'
import {
  AppleLoginRequest,
  FacebookLoginRequest,
  JwtResponse,
  KakaoLoginRequest,
  LoginRequest,
  LoginResponse,
  NaverLoginRequest,
  PasswordResetConfirmRequest,
  PasswordResetVerifyRequest,
  PasswordResetVerifyResponse,
  PhoneLoginRequest,
  PhoneLoginResponse,
  SocialAccountLinkRequest,
  SocialLinkResponse,
  SocialLoginResponse,
  SocialSignUpRequest,
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

  async verifyPasswordReset(request: PasswordResetVerifyRequest) {
    return api.post<PasswordResetVerifyResponse>(`${PASSWORD_RESET_BASE}/verify`, request)
  },

  async confirmPasswordReset(request: PasswordResetConfirmRequest) {
    return api.post<void>(`${PASSWORD_RESET_BASE}/confirm`, request)
  },

  async kakaoLogin(request: KakaoLoginRequest) {
    return api.post<SocialLoginResponse>(`${AUTH_BASE}/login/kakao`, request)
  },

  async naverLogin(request: NaverLoginRequest) {
    return api.post<SocialLoginResponse>(`${AUTH_BASE}/login/naver`, request)
  },

  async facebookLogin(request: FacebookLoginRequest) {
    return api.post<SocialLoginResponse>(`${AUTH_BASE}/login/facebook`, request)
  },

  async appleLogin(request: AppleLoginRequest) {
    return api.post<SocialLoginResponse>(`${AUTH_BASE}/login/apple`, request)
  },

  async phoneLogin(request: PhoneLoginRequest) {
    return api.post<PhoneLoginResponse>(`${AUTH_BASE}/login/phone`, request)
  },

  async linkSocialAccount(request: SocialAccountLinkRequest) {
    return api.post<SocialLinkResponse>(`${AUTH_BASE}/link/social`, request)
  },

  async signUpSocial(request: SocialSignUpRequest) {
    return api.post<JwtResponse>(`${AUTH_BASE}/signup/social`, request)
  },
}
