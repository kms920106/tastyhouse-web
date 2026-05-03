import 'server-only'
import { api } from '@/lib/api'
import { PolicyDetailResponse } from './policy.dto'

const ENDPOINT = '/api/policies/v1'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const policyRepository = {
  async getLatestTermsOfService() {
    return api.get<PolicyDetailResponse>(`${ENDPOINT}/terms-of-service/latest`, CACHE_OPTIONS)
  },

  async getLatestPrivacyPolicy() {
    return api.get<PolicyDetailResponse>(`${ENDPOINT}/privacy-policy/latest`, CACHE_OPTIONS)
  },

  async getLatestElectronicFinancialTransactions() {
    return api.get<PolicyDetailResponse>(
      `${ENDPOINT}/electronic-financial-transactions/latest`,
      CACHE_OPTIONS,
    )
  },

  async getLatestAgeVerification() {
    return api.get<PolicyDetailResponse>(`${ENDPOINT}/age-verification/latest`, CACHE_OPTIONS)
  },
}
