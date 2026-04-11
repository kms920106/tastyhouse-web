'use client'

import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import {
  confirmPhoneVerificationCode,
  sendPhoneVerificationCode,
} from '@/actions/phone-verification'
import { useState, useTransition } from 'react'

export interface UsePhoneAuthOptions {
  onVerified?: (phoneVerifyToken: string) => void
}

export interface UsePhoneAuthReturn {
  phone: string
  setPhone: (phone: string) => void
  verifyCode: string
  setVerifyCode: (code: string) => void
  isCodeVisible: boolean
  isVerified: boolean
  phoneVerifyToken: string
  isSending: boolean
  isConfirming: boolean
  handleSendCode: () => void
  handleConfirmCode: () => void
}

export function usePhoneAuth(options?: UsePhoneAuthOptions): UsePhoneAuthReturn {
  const [phone, setPhone] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [phoneVerifyToken, setPhoneVerifyToken] = useState('')
  const [isSending, startSending] = useTransition()
  const [isConfirming, startConfirming] = useTransition()

  const handleSendCode = () => {
    const rawPhone = phone.replace(/-/g, '')
    if (!rawPhone.match(/^01[0-9]{8,9}$/)) return

    startSending(async () => {
      try {
        const response = await sendPhoneVerificationCode({ phoneNumber: rawPhone })
        if (response?.error) {
          toast(response.error)
          return
        }
        setIsCodeVisible(true)
        toast('인증번호가 발송되었습니다.')
      } catch {
        toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
      }
    })
  }

  const handleConfirmCode = () => {
    const rawPhone = phone.replace(/-/g, '')

    startConfirming(async () => {
      try {
        const response = await confirmPhoneVerificationCode({
          phoneNumber: rawPhone,
          verificationCode: verifyCode,
        })
        if (response?.error) {
          toast(response.error)
          return
        }
        const token = response?.data?.phoneVerifyToken
        if (!token) {
          toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
          return
        }
        setPhoneVerifyToken(token)
        setIsVerified(true)
        options?.onVerified?.(token)
      } catch {
        toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
      }
    })
  }

  return {
    phone,
    setPhone,
    verifyCode,
    setVerifyCode,
    isCodeVisible,
    isVerified,
    phoneVerifyToken,
    isSending,
    isConfirming,
    handleSendCode,
    handleConfirmCode,
  }
}
