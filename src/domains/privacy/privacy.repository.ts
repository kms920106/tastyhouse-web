import { api } from '@/lib/api'
import { PrivacyItem } from './privacy.type'

const ENDPOINT = '/api/privacy'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const privacyRepository = {
  async getPrivacy() {
    return api.get<PrivacyItem>(`${ENDPOINT}/v1`, CACHE_OPTIONS)
  },
}
