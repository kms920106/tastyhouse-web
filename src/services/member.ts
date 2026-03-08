'use server'

import {
  memberRepository,
  memberService,
  UpdatePasswordRequest,
  UpdatePersonalInfoRequest,
  UpdateProfileRequest,
  VerifyPasswordRequest,
  WithdrawRequest,
} from '@/domains/member'
import { cookies } from 'next/headers'

export async function getMemberMe() {
  return memberRepository.getMemberMe()
}

export async function getMemberStats(memberId: number | string) {
  return memberRepository.getMemberStats(memberId)
}

export async function getMemberAvailableCoupons() {
  return memberRepository.getMyAvailableCoupons()
}

export async function getMemberUsablePoint() {
  return memberRepository.getMyUsablePoint()
}

export async function getMyPointHistory() {
  return memberRepository.getMyPointHistory()
}

export async function getMyReviews(page: number = 0, size: number = 9) {
  return memberService.getMyReviews(page, size)
}

export async function getOtherMemberProfile(memberId: number | string) {
  return memberRepository.getOtherMemberProfile(memberId)
}

export async function getMyBookmarks(page: number = 0, size: number = 10) {
  return memberService.getMyBookmarks(page, size)
}

export async function updateMemberProfile(data: UpdateProfileRequest) {
  return memberRepository.updateMyProfile(data)
}

export async function getMemberPersonalInfo() {
  return memberRepository.getMyPersonalInfo()
}

export async function verifyMemberPassword(data: VerifyPasswordRequest) {
  return memberRepository.verifyPassword(data)
}

export async function updateMemberPersonalInfo(
  data: UpdatePersonalInfoRequest,
  verifyToken: string,
  phoneVerifyToken?: string,
) {
  return memberRepository.updateMyPersonalInfo(data, verifyToken, phoneVerifyToken)
}

export async function updateMemberPassword(data: UpdatePasswordRequest, verifyToken: string) {
  return memberRepository.updateMyPassword(data, verifyToken)
}

export async function withdrawMember(data: WithdrawRequest) {
  const result = await memberRepository.withdrawMember(data)

  if (!result?.error) {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
  }

  return result
}
