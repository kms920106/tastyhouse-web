import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { GradeInfoItem, MyGradeResponse } from './grade.type'

const MEMBER_ENDPOINT = '/api/members'
const GRADE_ENDPOINT = '/api/grades'

export const gradeRepository = {
  async getMyGrade() {
    return api.get<ApiResponse<MyGradeResponse>>(`${MEMBER_ENDPOINT}/v1/me/grade`)
  },
  async getGradeInfoList() {
    return api.get<ApiResponse<GradeInfoItem[]>>(`${GRADE_ENDPOINT}/v1`)
  },
}
