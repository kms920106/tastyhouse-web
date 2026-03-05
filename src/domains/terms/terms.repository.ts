import { api } from '@/lib/api'
import { TermsItem } from './terms.type'

const ENDPOINT = '/api/terms'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const termsRepository = {
  async getTerms() {
    return api.get<TermsItem>(`${ENDPOINT}/v1`, CACHE_OPTIONS)
  },
}
