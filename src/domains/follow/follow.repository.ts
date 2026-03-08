import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import { FollowMemberResponse, MemberSearchResponse } from './follow.type'

const ENDPOINT = '/api/follows'

export const followRepository = {
  async getFollowingList(memberId: number, params: PaginationParams) {
    return api.get<FollowMemberResponse[]>(`${ENDPOINT}/v1/${memberId}/following`, { params })
  },

  async getFollowerList(memberId: number, params: PaginationParams) {
    return api.get<FollowMemberResponse[]>(`${ENDPOINT}/v1/${memberId}/followers`, { params })
  },

  async followMember(memberId: number) {
    return api.post<void>(`${ENDPOINT}/v1/${memberId}`)
  },

  async unfollowMember(memberId: number) {
    return api.delete<void>(`${ENDPOINT}/v1/${memberId}`)
  },

  async removeFollower(followerId: number) {
    return api.delete<void>(`${ENDPOINT}/v1/followers/${followerId}`)
  },
  async searchMembersByNickname(nickname: string, params: PaginationParams) {
    return api.get<MemberSearchResponse[]>(`${ENDPOINT}/v1/search`, {
      params: { nickname, ...params },
    })
  },
}
