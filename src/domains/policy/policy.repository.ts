import { api } from '@/lib/api'
import { PolicyDetail } from './policy.type'

const ENDPOINT = '/api/policies/v1'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const policyRepository = {
  async getLatestTermsOfService() {
    return api.get<PolicyDetail>(`${ENDPOINT}/terms-of-service/latest`, CACHE_OPTIONS)
  },

  async getLatestPrivacyPolicy() {
    return api.get<PolicyDetail>(`${ENDPOINT}/privacy-policy/latest`, CACHE_OPTIONS)
  },

  async getLatestElectronicFinancialTransactions() {
    return api.get<PolicyDetail>(`${ENDPOINT}/electronic-financial-transactions/latest`, CACHE_OPTIONS)
  },

  async getLatestAgeVerification() {
    return api.get<PolicyDetail>(`${ENDPOINT}/age-verification/latest`, CACHE_OPTIONS)
  },
}
