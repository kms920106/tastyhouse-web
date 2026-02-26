import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import {
  MemberCouponListItemResponse,
  MemberInfo,
  MyBookmarkedPlaceListItemResponse,
  MyReviewListItemResponse,
  MyReviewStatsResponse,
  PersonalInfoResponse,
  PointHistoryResponse,
  UpdatePasswordRequest,
  UpdatePersonalInfoRequest,
  UpdateProfileRequest,
  UsablePointResponse,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
  WithdrawRequest,
} from './member.type'

const ENDPOINT = '/api/members'

export const memberRepository = {
  // 내 프로필 조회
  async getMemberMe() {
    return api.get<MemberInfo>(`${ENDPOINT}/v1/me`)
  },
  // 내 리뷰 통계 조회
  async getMyReviewStats() {
    return api.get<MyReviewStatsResponse>(`${ENDPOINT}/v1/me/review-stats`)
  },
  // 사용 가능한 쿠폰 목록 조회
  async getMyAvailableCoupons() {
    return api.get<MemberCouponListItemResponse[]>(
      `${ENDPOINT}/v1/me/coupons/available`,
    )
  },
  // 보유 쿠폰 목록 조회
  async getMyCoupons() {
    return api.get<MemberCouponListItemResponse[]>(`${ENDPOINT}/v1/me/coupons`)
  },
  async getMyUsablePoint() {
    return api.get<UsablePointResponse>(`${ENDPOINT}/v1/me/point/usable`)
  },
  async getMyPointHistory() {
    return api.get<PointHistoryResponse>(`${ENDPOINT}/v1/me/point/history`)
  },
  async getMyReviews(params: PaginationParams) {
    return api.get<MyReviewListItemResponse[]>(`${ENDPOINT}/v1/me/reviews`, {
      params,
    })
  },
  async getMyBookmarks(params: PaginationParams) {
    return api.get<MyBookmarkedPlaceListItemResponse[]>(
      `${ENDPOINT}/v1/me/bookmarks`,
      {
        params,
      },
    )
  },
  // 프로필 수정
  async updateMyProfile(data: UpdateProfileRequest) {
    return api.put<void>(`${ENDPOINT}/v1/me/profile`, data)
  },
  // 개인정보 조회
  async getMyPersonalInfo() {
    return api.get<PersonalInfoResponse>(`${ENDPOINT}/v1/me/personal-info`)
  },
  // 비밀번호 인증 (개인정보 수정 진입)
  async verifyPassword(data: VerifyPasswordRequest) {
    return api.post<VerifyPasswordResponse>(`${ENDPOINT}/v1/me/verify-password`, data)
  },
  // 개인정보 수정
  async updateMyPersonalInfo(
    data: UpdatePersonalInfoRequest,
    verifyToken: string,
    phoneVerifyToken?: string,
  ) {
    return api.put<void>(`${ENDPOINT}/v1/me/personal-info`, data, {
      headers: {
        'X-Verify-Token': verifyToken,
        ...(phoneVerifyToken ? { 'X-Phone-Verify-Token': phoneVerifyToken } : {}),
      },
    })
  },
  // 비밀번호 변경
  async updateMyPassword(data: UpdatePasswordRequest, verifyToken: string) {
    return api.put<void>(`${ENDPOINT}/v1/me/password`, data, {
      headers: {
        'X-Verify-Token': verifyToken,
      },
    })
  },
  // 회원 탈퇴
  async withdrawMember(data: WithdrawRequest) {
    return api.delete<void>(`${ENDPOINT}/v1/me`, data)
  },
}
