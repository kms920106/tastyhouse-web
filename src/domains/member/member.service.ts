import { memberRepository } from './member.repository'
import { UpdateProfileRequest } from './member.type'

export const memberService = {
  async getMemberMe() {
    return await memberRepository.getMemberMe()
  },
  async getMyReviewStats() {
    return await memberRepository.getMyReviewStats()
  },
  async getMyAvailableCoupons() {
    return await memberRepository.getMyAvailableCoupons()
  },
  async getMyCoupons() {
    const { error, data } = await memberRepository.getMyCoupons()
    return error ? [] : data?.data ?? []
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
}
