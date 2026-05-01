import { api } from '@/lib/api'
import 'server-only'
import { GradeInfoItemResponse } from './grade.dto'

const ENDPOINT = '/api/grades'

export const gradeRepository = {
  async getGradeInfoList() {
    return api.get<GradeInfoItemResponse[]>(`${ENDPOINT}/v1`)
  },
}
