import { PaginationParams } from '@/types/common'
import { followRepository } from './follow.repository'

export const followService = {
  async getFollowingList(memberId: number, params: PaginationParams) {
    return followRepository.getFollowingList(memberId, params)
  },

  async getFollowerList(memberId: number, params: PaginationParams) {
    return followRepository.getFollowerList(memberId, params)
  },

  async followMember(memberId: number) {
    return followRepository.followMember(memberId)
  },

  async unfollowMember(memberId: number) {
    return followRepository.unfollowMember(memberId)
  },

  async removeFollower(followerId: number) {
    return followRepository.removeFollower(followerId)
  },
}
