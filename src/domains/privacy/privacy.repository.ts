import { api } from '@/lib/api'
import { PrivacyItem } from './privacy.type'

const ENDPOINT = '/api/privacy'

export const privacyRepository = {
  async getPrivacy() {
    return api.get<PrivacyItem>(`${ENDPOINT}/v1`)
  },
}
