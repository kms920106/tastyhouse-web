import { api } from '@/lib/api'
import { TermsItem } from './terms.type'

const ENDPOINT = '/api/terms'

export const termsRepository = {
  async getTerms() {
    return api.get<TermsItem>(`${ENDPOINT}/v1`)
  },
}
