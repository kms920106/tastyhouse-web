export type SocialProvider = 'KAKAO' | 'NAVER' | 'FACEBOOK' | 'APPLE'

export type SocialLoginStatus = 'LOGIN' | 'NEEDS_SIGN_UP' | 'NEEDS_LINKING'

export type SocialLinkStatus = 'LOGIN' | 'NEEDS_SIGN_UP'

// API DTO가 아닌 loginFormAction의 반환 타입
export type LoginResult = {
  success: false
  error: string
}
