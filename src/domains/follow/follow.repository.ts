import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import { FollowMemberResponse } from './follow.type'

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

  async removeFollower(memberId: number) {
    return api.delete<void>(`${ENDPOINT}/v1/me/followers/${memberId}`)
  },
}
