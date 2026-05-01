import type { Gender } from '@/domains/member'

export interface JwtToken {
  accessToken: string
  refreshToken: string
  tokenType: string
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
