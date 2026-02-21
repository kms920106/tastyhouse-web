import { api } from '@/lib/api'
import { ApiResponse, PaginationParams } from '@/types/common'
import {
  MemberCouponListItemResponse,
  MemberInfo,
  MyBookmarkedPlaceListItemResponse,
  MyReviewListItemResponse,
  MyReviewStatsResponse,
  PointHistoryResponse,
  UpdateProfileRequest,
  UsablePointResponse,
  VerifyPasswordRequest,
  VerifyPasswordResponse,
} from './member.type'

const ENDPOINT = '/api/members'

export const memberRepository = {
  // 내 프로필 조회
  async getMemberMe() {
    return api.get<ApiResponse<MemberInfo>>(`${ENDPOINT}/v1/me`)
  },
  // 내 리뷰 통계 조회
  async getMyReviewStats() {
    return api.get<ApiResponse<MyReviewStatsResponse>>(`${ENDPOINT}/v1/me/review-stats`)
  },
  // 사용 가능한 쿠폰 목록 조회
  async getMyAvailableCoupons() {
    return api.get<ApiResponse<MemberCouponListItemResponse[]>>(
      `${ENDPOINT}/v1/me/coupons/available`,
    )
  },
  // 보유 쿠폰 목록 조회
  async getMyCoupons() {
    return api.get<ApiResponse<MemberCouponListItemResponse[]>>(`${ENDPOINT}/v1/me/coupons`)
  },
  async getMyUsablePoint() {
    return api.get<ApiResponse<UsablePointResponse>>(`${ENDPOINT}/v1/me/point/usable`)
  },
  async getMyPointHistory() {
    return api.get<ApiResponse<PointHistoryResponse>>(`${ENDPOINT}/v1/me/point/history`)
  },
  async getMyReviews(params: PaginationParams) {
    return api.get<ApiResponse<MyReviewListItemResponse[]>>(`${ENDPOINT}/v1/me/reviews`, {
      params,
    })
  },
  async getMyBookmarks(params: PaginationParams) {
    return api.get<ApiResponse<MyBookmarkedPlaceListItemResponse[]>>(
      `${ENDPOINT}/v1/me/bookmarks`,
      {
        params,
      },
    )
  },
  // 프로필 수정
  async updateMyProfile(data: UpdateProfileRequest) {
    return api.put<ApiResponse<void>>(`${ENDPOINT}/v1/me/profile`, data)
  },
  // 비밀번호 인증 (개인정보 수정 진입)
  async verifyPassword(data: VerifyPasswordRequest) {
    return api.post<ApiResponse<VerifyPasswordResponse>>(`${ENDPOINT}/v1/me/verify-password`, data)
  },
}
