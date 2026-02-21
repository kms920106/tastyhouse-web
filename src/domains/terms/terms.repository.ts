import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { TermsItem } from './terms.type'

const ENDPOINT = '/api/terms'

export const termsRepository = {
  async getTerms() {
    return api.get<ApiResponse<TermsItem>>(`${ENDPOINT}/v1`)
  },
}
