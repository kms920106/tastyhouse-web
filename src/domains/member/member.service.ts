import { memberRepository } from './member.repository'
import { UpdatePasswordRequest, UpdatePersonalInfoRequest, UpdateProfileRequest, VerifyPasswordRequest, WithdrawRequest } from './member.type'

export const memberService = {
  async getOtherMemberProfile(memberId: number | string) {
    return await memberRepository.getOtherMemberProfile(memberId)
  },
  async getMemberMe() {
    return await memberRepository.getMemberMe()
  },
  async getMyStats() {
    return await memberRepository.getMyStats()
  },
  async getMemberStats(memberId: number | string) {
    return await memberRepository.getMemberStats(memberId)
  },
  async getMyAvailableCoupons() {
    return await memberRepository.getMyAvailableCoupons()
  },
  async getMyCoupons() {
    const { error, data } = await memberRepository.getMyCoupons()
    return error ? [] : data ?? []
  },
  async getMyUsablePoint() {
    return await memberRepository.getMyUsablePoint()
  },
  async getMyPointHistory() {
    return await memberRepository.getMyPointHistory()
  },
  async getMyReviews(page: number = 0, size: number = 9) {
    return await memberRepository.getMyReviews({ page, size })
  },
  async getMyBookmarks(page: number = 0, size: number = 10) {
    return await memberRepository.getMyBookmarks({ page, size })
  },
  async updateMyProfile(data: UpdateProfileRequest) {
    return await memberRepository.updateMyProfile(data)
  },
  async getMyPersonalInfo() {
    return await memberRepository.getMyPersonalInfo()
  },
  async verifyPassword(data: VerifyPasswordRequest) {
    return await memberRepository.verifyPassword(data)
  },
  async updateMyPersonalInfo(
    data: UpdatePersonalInfoRequest,
    verifyToken: string,
    phoneVerifyToken?: string,
  ) {
    return await memberRepository.updateMyPersonalInfo(data, verifyToken, phoneVerifyToken)
  },
  async updateMyPassword(data: UpdatePasswordRequest, verifyToken: string) {
    return await memberRepository.updateMyPassword(data, verifyToken)
  },
  async withdrawMember(data: WithdrawRequest) {
    return await memberRepository.withdrawMember(data)
  },
}
