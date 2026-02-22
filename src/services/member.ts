'use server'

import {
  memberService,
  UpdatePersonalInfoRequest,
  UpdateProfileRequest,
  VerifyPasswordRequest,
  WithdrawRequest,
} from '@/domains/member'
import { cookies } from 'next/headers'

export async function getMemberMe() {
  return await memberService.getMemberMe()
}

export async function getMyReviewStats() {
  return await memberService.getMyReviewStats()
}

export async function getMemberAvailableCoupons() {
  return await memberService.getMyAvailableCoupons()
}

export async function getMemberUsablePoint() {
  return await memberService.getMyUsablePoint()
}

export async function getMyPointHistory() {
  return await memberService.getMyPointHistory()
}

export async function getMyReviews(page: number = 0, size: number = 9) {
  return await memberService.getMyReviews(page, size)
}

export async function getMyBookmarks(page: number = 0, size: number = 10) {
  return await memberService.getMyBookmarks(page, size)
}

export async function updateMemberProfile(data: UpdateProfileRequest) {
  return await memberService.updateMyProfile(data)
}

export async function getMemberPersonalInfo() {
  return await memberService.getMyPersonalInfo()
}

export async function verifyMemberPassword(data: VerifyPasswordRequest) {
  return await memberService.verifyPassword(data)
}

export async function updateMemberPersonalInfo(
  data: UpdatePersonalInfoRequest,
  verifyToken: string,
  phoneVerifyToken?: string,
) {
  return await memberService.updateMyPersonalInfo(data, verifyToken, phoneVerifyToken)
}

export async function withdrawMember(data: WithdrawRequest) {
  const result = await memberService.withdrawMember(data)

  if (!result?.error) {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
  }

  return result
}
