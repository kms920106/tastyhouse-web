import 'server-only'

import { publicApi } from '@/lib/api'
import { GradeInfoItemResponse } from './grade.dto'

const ENDPOINT = '/api/grades'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const gradeRepository = {
  async getGradeInfoList() {
    return publicApi.get<GradeInfoItemResponse[]>(`${ENDPOINT}/v1`, CACHE_OPTIONS)
  },
}
