'use server'

import type { PaymentCancelRequest, PaymentConfirmRequest, PaymentCreateRequest } from '@/domains/payment'
import { paymentRepository } from '@/domains/payment'

export async function createPayment(request: PaymentCreateRequest) {
  return paymentRepository.createPayment(request)
}

export async function completeOnSitePayment(paymentId: number) {
  return paymentRepository.completeOnSitePayment(paymentId)
}

export async function confirmPaymentToss(request: PaymentConfirmRequest, accessToken?: string) {
  return paymentRepository.confirmPaymentToss(request, accessToken)
}

export async function cancelPayment(paymentId: number, request: PaymentCancelRequest) {
  return paymentRepository.cancelPayment(paymentId, request)
}
