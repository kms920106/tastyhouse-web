'use client'

import { phoneLoginAction } from '@/actions/auth'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppFormField from '@/components/ui/AppFormField'
import AppInputPhone from '@/components/ui/AppInputPhone'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import { PHONE_ERROR_MESSAGES, PHONE_REGEX } from '@/constants/validation'
import { usePhoneAuth } from '@/hooks/usePhoneAuth'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface PhoneVerificationSectionProps {
  nextUrl: string
}

export default function PhoneVerificationSection({ nextUrl }: PhoneVerificationSectionProps) {
  const router = useRouter()
  const phoneAuth = usePhoneAuth()
  const [phoneError, setPhoneError] = useState<string | undefined>()
  const [isProcessing, startProcessing] = useTransition()

  const {
    phone,
    setPhone,
    verifyCode,
    setVerifyCode,
    isCodeVisible,
    isVerified,
    isSending,
    isConfirming,
    phoneVerifyToken,
    handleConfirmCode,
  } = phoneAuth

  const handleSendCode = () => {
    const rawPhone = phone.replace(/-/g, '')
    if (!PHONE_REGEX.test(rawPhone)) {
      setPhoneError(PHONE_ERROR_MESSAGES.INVALID)
      return
    }
    setPhoneError(undefined)
    phoneAuth.handleSendCode()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isVerified) {
      toast('휴대폰 인증을 완료해 주세요.')
      return
    }

    startProcessing(async () => {
      const result = await phoneLoginAction(phoneVerifyToken)

      if (!result.success) {
        toast(result.error)
        return
      }

      if (result.needsSignUp) {
        router.replace(nextUrl)
        return
      }

      router.replace('/')
    })
  }

  return (
    <section className="min-h-screen">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>휴대폰 인증</HeaderTitle>
        </HeaderCenter>
      </Header>
      <form onSubmit={handleSubmit}>
        <div className="px-[15px] py-[30px] flex flex-col gap-5">
          <AppFormField label="휴대폰 번호" required error={phoneError}>
            {({ className }) => (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <AppInputPhone
                    value={phone}
                    onChange={(e) => {
                      if (e.target.value.length <= 11) {
                        setPhone(e.target.value)
                      }
                      if (phoneError) setPhoneError(undefined)
                    }}
                    readOnly={isVerified}
                    placeholder="숫자만 입력해 주세요."
                    maxLength={11}
                    className={cn('flex-1 pr-4', className)}
                  />
                  <AppOutlineButton
                    type="button"
                    onClick={handleSendCode}
                    disabled={!phone.trim() || isVerified || isSending}
                    className="shrink-0"
                  >
                    {isSending ? '발송 중' : isCodeVisible ? '재발송' : '인증번호 받기'}
                  </AppOutlineButton>
                </div>
                {isCodeVisible && (
                  <div className="flex gap-2">
                    <AppInputPhone
                      value={verifyCode}
                      onChange={(e) => {
                        if (e.target.value.length <= 6) setVerifyCode(e.target.value)
                      }}
                      readOnly={isVerified}
                      placeholder="숫자만 입력해 주세요."
                      maxLength={6}
                      className="flex-1 pr-4"
                    />
                    <AppOutlineButton
                      type="button"
                      className="shrink-0"
                      onClick={handleConfirmCode}
                      disabled={isVerified || isConfirming}
                    >
                      {isConfirming ? '확인 중' : '확인'}
                    </AppOutlineButton>
                  </div>
                )}
                {isVerified && (
                  <p className="text-xs leading-[12px] text-[#999999]">인증이 완료되었습니다.</p>
                )}
              </div>
            )}
          </AppFormField>

          <AppSubmitButton isSubmitting={isProcessing} loadingText="처리 중">
            다음
          </AppSubmitButton>
        </div>
      </form>
    </section>
  )
}
