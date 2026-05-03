import 'server-only'
import { publicApi } from '@/lib/api'
import { PolicyDetailResponse } from './policies.dto'

const ENDPOINT = '/api/policies/v1'

const CACHE_OPTIONS = { cache: 'force-cache' as const, next: { revalidate: 3600 } }

export const policiesRepository = {
  // 최신 이용약관 조회
  async getLatestTermsOfService() {
    return publicApi.get<PolicyDetailResponse>(`${ENDPOINT}/terms-of-service/latest`, CACHE_OPTIONS)
  },
  // 최신 개인정보처리방침 조회
  async getLatestPrivacyPolicy() {
    return publicApi.get<PolicyDetailResponse>(`${ENDPOINT}/privacy-policy/latest`, CACHE_OPTIONS)
  },
  // 최신 전자금융거래 약관 조회
  async getLatestElectronicFinancialTransactions() {
    return publicApi.get<PolicyDetailResponse>(
      `${ENDPOINT}/electronic-financial-transactions/latest`,
      CACHE_OPTIONS,
    )
  },
  // 최신 만 14세 이상 동의 약관 조회
  async getLatestAgeVerification() {
    return publicApi.get<PolicyDetailResponse>(`${ENDPOINT}/age-verification/latest`, CACHE_OPTIONS)
  },
  // 특정 버전 이용약관 조회
  async getTermsOfServiceByVersion(version: string) {
    return publicApi.get<PolicyDetailResponse>(
      `${ENDPOINT}/terms-of-service/version/${version}`,
      CACHE_OPTIONS,
    )
  },
}
