import { api } from '@/lib/api'
import 'server-only'
import {
  RankDurationResponse,
  RankMemberListItemResponse,
  RankMemberMeQuery,
  RankMemberMeResponse,
  RankMemberQuery,
  RankPrizeListItemResponse,
} from './rank.dto'

const ENDPOINT = '/api/ranks'

export const rankRepository = {
  async getRankDuration() {
    return api.get<RankDurationResponse>(`${ENDPOINT}/v1/duration`)
  },
  async getRankPrizes() {
    return api.get<RankPrizeListItemResponse[]>(`${ENDPOINT}/v1/prizes`)
  },
  async getRankMembers(params: RankMemberQuery) {
    return api.get<RankMemberListItemResponse[]>(`${ENDPOINT}/v1/members`, { params })
  },
  async getRankMembersMe(params: RankMemberMeQuery) {
    return api.get<RankMemberMeResponse>(`${ENDPOINT}/v1/members/me`, { params })
  },
}
