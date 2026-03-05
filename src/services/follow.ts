'use server'

import { followService } from '@/domains/follow'
import { PaginationParams } from '@/types/common'

export async function getFollowingList(memberId: number, params: PaginationParams) {
  return followService.getFollowingList(memberId, params)
}

export async function getFollowerList(memberId: number, params: PaginationParams) {
  return followService.getFollowerList(memberId, params)
}

export async function followMember(memberId: number) {
  return followService.followMember(memberId)
}

export async function unfollowMember(memberId: number) {
  return followService.unfollowMember(memberId)
}

export async function removeFollower(memberId: number) {
  return followService.removeFollower(memberId)
}
