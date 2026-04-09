import { api } from '@/lib/api'
import {
  KakaoLoginPayload,
  KakaoLoginResponse,
  KakaoSignUpPayload,
  KakaoSignUpResponse,
  LoginRequest,
  LoginResponse,
  PasswordResetConfirmPayload,
  PasswordResetVerifyPayload,
  PasswordResetVerifyResponse,
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

  async kakaoSignUp(payload: KakaoSignUpPayload) {
    return api.post<KakaoSignUpResponse>(`${AUTH_BASE}/signup/kakao`, payload)
  },
}
