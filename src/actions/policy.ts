'use server'

import { policyRepository } from '@/domains/policy/policy.repository'

export async function fetchTermsOfServiceContent(): Promise<string> {
  const { data } = await policyRepository.getLatestTermsOfService()
  return data?.content ?? ''
}

export async function fetchPrivacyPolicyContent(): Promise<string> {
  const { data } = await policyRepository.getLatestPrivacyPolicy()
  return data?.content ?? ''
}

export async function fetchElectronicFinancialTransactionsContent(): Promise<string> {
  const { data } = await policyRepository.getLatestElectronicFinancialTransactions()
  return data?.content ?? ''
}

export async function fetchAgeVerificationContent(): Promise<string> {
  const { data } = await policyRepository.getLatestAgeVerification()
  return data?.content ?? ''
}
