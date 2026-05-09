import 'server-only'

import { getMemberGradeColor, getMemberGradeIcon, getMemberGradeName } from './member.constants'
import type { Member } from './member.model'
import { memberRepository } from './member.repository'
import type { ApiResponse } from '@/lib/api'
import { getMemberIdFromToken } from '@/lib/auth-config'

export const memberService = {
  async getMe(): Promise<ApiResponse<Member>> {
    const memberId = await getMemberIdFromToken()
    if (!memberId) return { data: undefined, status: 401 }

    const response = await memberRepository.getMemberProfile(memberId)
    if (!response.data) return { ...response, data: undefined }

    const grade = response.data.memberGrade
    return {
      ...response,
      data: {
        id: response.data.id,
        nickname: response.data.nickname,
        grade,
        gradeName: getMemberGradeName(grade),
        gradeIcon: getMemberGradeIcon(grade),
        gradeColor: getMemberGradeColor(grade),
        statusMessage: response.data.statusMessage,
        profileImageUrl: response.data.profileImageUrl,
      },
    }
  },
}
