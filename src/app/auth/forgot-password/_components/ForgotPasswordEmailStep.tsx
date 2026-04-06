'use client'

import {
  confirmEmailVerificationCode,
  sendEmailVerificationCode,
} from '@/app/auth/forgot-password/action'
import AppFormField from '@/components/ui/AppFormField'
import AppInputPhone from '@/components/ui/AppInputPhone'
import AppInputText from '@/components/ui/AppInputText'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import { cn } from '@/lib/utils'
import { useState, useTransition } from 'react'
import { z } from 'zod'

const emailSchema = z.string().superRefine((val, ctx) => {
  if (val.length === 0) {
    ctx.addIssue({ code: 'custom', message: '이메일을 입력해 주세요.' })
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    ctx.addIssue({ code: 'custom', message: '올바른 이메일 주소 형식이 아닙니다.' })
  }
})

interface ForgotPasswordEmailStepProps {
  onVerified: (email: string, emailVerifyToken: string) => void
}

export default function ForgotPasswordEmailStep({ onVerified }: ForgotPasswordEmailStepProps) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()

  const [verifyCode, setVerifyCode] = useState('')
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const [isSending, startSending] = useTransition()
  const [isConfirming, startConfirming] = useTransition()

  const validateEmail = (): boolean => {
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setEmailError(result.error.issues[0]?.message)
      return false
    }
    setEmailError(undefined)
    return true
  }

  const handleSendCode = () => {
    if (!validateEmail()) return

    startSending(async () => {
      try {
        const response = await sendEmailVerificationCode(email)

        if (response?.error) {
          toast(response.error)
          return
        }

        setIsCodeVisible(true)
        toast('인증 메일이 발송되었습니다.')
      } catch {
        toast('인증 메일 발송에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  const handleConfirmCode = () => {
    startConfirming(async () => {
      try {
        const response = await confirmEmailVerificationCode(email, verifyCode)

        if (response?.error) {
          toast(response.error)
          return
        }

        const token = response?.data?.emailVerifyToken
        if (!token) {
          toast('인증에 실패했습니다. 다시 시도해 주세요.')
          return
        }

        setIsEmailVerified(true)
        onVerified(email, token)
      } catch {
        toast('인증번호 확인에 실패했습니다. 다시 시도해 주세요.')
      }
    })
  }

  return (
    <div className="px-[15px] py-[30px] flex flex-col gap-5">
      <AppFormField label="아이디" required error={emailError}>
        {({ className }) => (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <AppInputText
                id="email"
                name="email"
                // type="email"
                placeholder="이메일을 입력해 주세요."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setIsEmailVerified(false)
                  setIsCodeVisible(false)
                  if (emailError) setEmailError(undefined)
                }}
                readOnly={isEmailVerified}
                className={cn('flex-1', className)}
              />
              {isCodeVisible && (
                <AppOutlineButton
                  type="button"
                  onClick={handleSendCode}
                  disabled={isEmailVerified || isSending}
                  className="shrink-0"
                >
                  {isSending ? '발송 중' : '재발송'}
                </AppOutlineButton>
              )}
            </div>

            {isCodeVisible && (
              <div className="flex gap-2">
                <AppInputPhone
                  value={verifyCode}
                  onChange={(e) => {
                    if (e.target.value.length <= 6) setVerifyCode(e.target.value)
                  }}
                  readOnly={isEmailVerified}
                  placeholder="123456"
                  maxLength={6}
                  className="flex-1 pr-4"
                />
                <AppOutlineButton
                  type="button"
                  className="shrink-0"
                  onClick={handleConfirmCode}
                  disabled={!verifyCode.trim() || isEmailVerified || isConfirming}
                >
                  {isConfirming ? '확인 중' : '확인'}
                </AppOutlineButton>
              </div>
            )}

            {isEmailVerified && (
              <p className="text-xs leading-[12px] text-[#999999]">인증이 완료되었습니다.</p>
            )}
          </div>
        )}
      </AppFormField>

      <div className="mt-[10px]">
        <AppSubmitButton
          onClick={handleSendCode}
          isSubmitting={isSending}
          loadingText="발송 중"
          disabled={isEmailVerified}
        >
          {isCodeVisible ? '재발송' : '인증메일 받기'}
        </AppSubmitButton>
      </div>
    </div>
  )
}
