import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import { PrivacyItem } from './privacy.type'

const ENDPOINT = '/api/privacy'

export const privacyRepository = {
  async getPrivacy() {
    return api.get<ApiResponse<PrivacyItem>>(`${ENDPOINT}/v1`)
  },
}
