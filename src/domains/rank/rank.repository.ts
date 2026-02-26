import { api } from '@/lib/api'
import {
  RankMemberListItemResponse,
  RankMemberMeResponse,
  RankMemberQuery,
  RankMembersMeQuery,
} from './rank.type'

const ENDPOINT = '/api/ranks'

export const rankRepository = {
  async getRankMembers(params: RankMemberQuery) {
    return api.get<RankMemberListItemResponse[]>(`${ENDPOINT}/v1/members`, { params })
  },
  async getRankMembersMe(params: RankMembersMeQuery) {
    return api.get<RankMemberMeResponse>(`${ENDPOINT}/v1/members/me`, { params })
  },
}
