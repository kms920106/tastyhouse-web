'use server'

import { followRepository } from '@/domains/follow'
import { PaginationParams } from '@/types/common'

export async function getFollowingList(memberId: number, params: PaginationParams) {
  return followRepository.getFollowingList(memberId, params)
}

export async function getFollowerList(memberId: number, params: PaginationParams) {
  return followRepository.getFollowerList(memberId, params)
}

export async function followMember(memberId: number) {
  return followRepository.followMember(memberId)
}

export async function unfollowMember(memberId: number) {
  return followRepository.unfollowMember(memberId)
}

export async function removeFollower(followerId: number) {
  return followRepository.removeFollower(followerId)
}

export async function searchMembersByNickname(
  nickname: string,
  page: number = 0,
  size: number = 20,
) {
  return followRepository.searchMembersByNickname(nickname, { page, size })
}
