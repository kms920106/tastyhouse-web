'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppInputNumber from '@/components/ui/AppInputNumber'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import AppSelect from '@/components/ui/AppSelect'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import type { Gender } from '@/domains/member'
import { getMemberPersonalInfo, updateMemberPersonalInfo } from '@/services/member'
import {
  confirmPhoneVerificationCode,
  sendPhoneVerificationCode,
} from '@/services/phone-verification'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2026 - i)
const BIRTH_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const accountInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z
    .string()
    .min(1, '휴대폰 번호를 입력해주세요.')
    .regex(/^01[0-9]{8,9}$/, '올바른 휴대폰 번호를 입력해주세요.'),
  birthYear: z.string().min(1, '생년월일을 선택해주세요.'),
  birthMonth: z.string().min(1, '생년월일을 선택해주세요.'),
  birthDay: z.string().min(1, '생년월일을 선택해주세요.'),
  gender: z.enum(['MALE', 'FEMALE'], { message: '성별을 선택해주세요.' }),
})

type FormErrors = Partial<Record<keyof z.infer<typeof accountInfoSchema>, string>>

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="shrink-0">
      <Image
        src={checked ? '/images/icon-toggle-on.png' : '/images/icon-toggle-off.png'}
        alt={checked ? '켜짐' : '꺼짐'}
        width={43}
        height={24}
      />
    </button>
  )
}

function parseBirthDate(birthDate: number | null) {
  if (!birthDate) return { year: '', month: '', day: '' }
  const str = String(birthDate)
  return {
    year: str.slice(0, 4),
    month: String(parseInt(str.slice(4, 6), 10)),
    day: String(parseInt(str.slice(6, 8), 10)),
  }
}

export default function AccountInfoEditForm() {
  const searchParams = useSearchParams()
  const verifyToken = searchParams.get('verifyToken') ?? ''

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [originalPhone, setOriginalPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerificationVisible, setIsVerificationVisible] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [phoneVerifyToken, setPhoneVerifyToken] = useState('')
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isConfirmingCode, setIsConfirmingCode] = useState(false)
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [gender, setGender] = useState<Gender>('FEMALE')
  const [pushNotification, setPushNotification] = useState(false)
  const [marketingNotification, setMarketingNotification] = useState(false)
  const [eventNotification, setEventNotification] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getMemberPersonalInfo().then(({ data }) => {
      const info = data?.data
      if (!info) return
      const { year, month, day } = parseBirthDate(info.birthDate)
      setEmail(info.email)
      setName(info.fullName)
      setPhone(info.phoneNumber)
      setOriginalPhone(info.phoneNumber)
      setBirthYear(year)
      setBirthMonth(month)
      setBirthDay(day)
      if (info.gender) setGender(info.gender)
      setPushNotification(info.pushNotificationEnabled)
      setMarketingNotification(info.marketingInfoEnabled)
      setEventNotification(info.eventInfoEnabled)
    })
  }, [])

  const handleSendVerification = async () => {
    const rawPhone = phone.replace(/-/g, '')
    if (!rawPhone.match(/^01[0-9]{8,9}$/)) {
      setErrors((prev) => ({ ...prev, phone: '올바른 휴대폰 번호를 입력해주세요.' }))
      return
    }

    if (rawPhone === originalPhone.replace(/-/g, '')) {
      setErrors((prev) => ({ ...prev, phone: '현재 등록된 휴대폰 번호와 동일합니다.' }))
      return
    }

    setIsSendingCode(true)
    try {
      const response = await sendPhoneVerificationCode({ phoneNumber: rawPhone })
      if (response?.error) {
        toast(response.error)
        return
      }
      setIsVerificationVisible(true)
      toast('인증번호가 발송되었습니다.')
    } catch {
      toast('인증번호 발송에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleConfirmVerification = async () => {
    const rawPhone = phone.replace(/-/g, '')

    setIsConfirmingCode(true)
    try {
      const response = await confirmPhoneVerificationCode({
        phoneNumber: rawPhone,
        verificationCode,
      })
      if (response?.error) {
        toast(response.error)
        return
      }
      const token = response?.data?.data?.phoneVerifyToken
      if (!token) {
        toast('인증에 실패했습니다. 다시 시도해주세요.')
        return
      }
      setPhoneVerifyToken(token)
      setIsVerified(true)
    } catch {
      toast('인증번호 확인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsConfirmingCode(false)
    }
  }

  const buildBirthDate = (): number | undefined => {
    if (!birthYear || !birthMonth || !birthDay) return undefined
    const mm = String(birthMonth).padStart(2, '0')
    const dd = String(birthDay).padStart(2, '0')
    return Number(`${birthYear}${mm}${dd}`)
  }

  const validateForm = (): boolean => {
    const result = accountInfoSchema.safeParse({
      name: name.trim(),
      phone: phone.replace(/-/g, ''),
      birthYear,
      birthMonth,
      birthDay,
      gender,
    })

    if (result.success) {
      setErrors({})
      return true
    }

    const fieldErrors = z.flattenError(result.error).fieldErrors
    const newErrors: FormErrors = {}
    for (const key in fieldErrors) {
      const field = key as keyof FormErrors
      newErrors[field] = fieldErrors[field]?.[0]
    }
    setErrors(newErrors)
    return false
  }

  const handleSubmit = async () => {
    if (!verifyToken) {
      toast('인증 정보가 없습니다. 다시 시도해주세요.')
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await updateMemberPersonalInfo(
        {
          fullName: name,
          phoneNumber: isVerified ? phone.replace(/-/g, '') : undefined,
          birthDate: buildBirthDate(),
          gender,
          pushNotificationEnabled: pushNotification,
          marketingInfoEnabled: marketingNotification,
          eventInfoEnabled: eventNotification,
        },
        verifyToken,
        isVerified ? phoneVerifyToken : undefined,
      )

      if (response?.error) {
        toast(response.error)
        return
      }

      toast('개인정보가 수정되었습니다.')
    } catch {
      toast('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SectionStack>
        <BorderedSection>
          <div className="px-[15px] py-[30px] flex flex-col gap-5">
            {/* 아이디 */}
            <AppFormField label="아이디" required>
              {() => (
                <AppInput
                  type="email"
                  value={email}
                  readOnly
                  className="pr-4 bg-[#f8f8f8] text-[#aaaaaa]"
                />
              )}
            </AppFormField>
            <AppFormField label="이름" required error={errors.name}>
              {({ className }) => (
                <AppInput
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                  }}
                  placeholder="이름을 입력해주세요."
                  className={`pr-4 ${className ?? ''}`}
                />
              )}
            </AppFormField>
            <AppFormField label="휴대폰 번호" required error={errors.phone}>
              {({ className }) => (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <AppInputNumber
                      value={phone}
                      onChange={(e) => {
                        if (e.target.value.length <= 11) setPhone(e.target.value)
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }))
                      }}
                      readOnly={isVerified}
                      placeholder="01012345678"
                      disabled={isVerified}
                      maxLength={11}
                      className={`flex-1 pr-4 ${isVerified ? 'bg-[#f8f8f8] text-[#aaaaaa]' : ''} ${className ?? ''}`}
                    />
                    <AppOutlineButton
                      onClick={handleSendVerification}
                      disabled={isVerified || isSendingCode}
                      className="shrink-0 w-auto px-4"
                    >
                      {isSendingCode ? '발송 중' : isVerificationVisible ? '재발송' : '인증번호 발송'}
                    </AppOutlineButton>
                  </div>
                  {isVerificationVisible && (
                    <div className="flex gap-2">
                      <AppInputNumber
                        value={verificationCode}
                        onChange={(e) => {
                          if (e.target.value.length <= 6) setVerificationCode(e.target.value)
                        }}
                        readOnly={isVerified}
                        disabled={isVerified}
                        placeholder="123456"
                        maxLength={6}
                        className={`flex-1 pr-4 ${isVerified ? 'bg-[#f8f8f8] text-[#aaaaaa]' : ''}`}
                      />
                      <AppOutlineButton
                        className="shrink-0 w-auto px-4"
                        onClick={handleConfirmVerification}
                        disabled={isVerified || isConfirmingCode}
                      >
                        {isConfirmingCode ? '확인 중' : '확인'}
                      </AppOutlineButton>
                    </div>
                  )}
                  {isVerified && (
                    <p className="text-xs leading-[12px] text-[#666666]">인증이 완료되었습니다.</p>
                  )}
                </div>
              )}
            </AppFormField>
            <AppFormField label="생년월일" required error={errors.birthYear}>
              {() => (
                <div className="flex gap-2">
                  <AppSelect
                    value={birthYear}
                    onChange={(e) => {
                      setBirthYear(e.target.value)
                      if (errors.birthYear) setErrors((prev) => ({ ...prev, birthYear: undefined }))
                    }}
                    className="flex-1 border-[#eeeeee] focus:border-[#666666]"
                  >
                    <option value="">년도</option>
                    {BIRTH_YEARS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </AppSelect>
                  <AppSelect
                    value={birthMonth}
                    onChange={(e) => {
                      setBirthMonth(e.target.value)
                      if (errors.birthYear) setErrors((prev) => ({ ...prev, birthYear: undefined }))
                    }}
                    className="flex-1 border-[#eeeeee] focus:border-[#666666]"
                  >
                    <option value="">월</option>
                    {BIRTH_MONTHS.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </AppSelect>
                  <AppSelect
                    value={birthDay}
                    onChange={(e) => {
                      setBirthDay(e.target.value)
                      if (errors.birthYear) setErrors((prev) => ({ ...prev, birthYear: undefined }))
                    }}
                    className="flex-1 border-[#eeeeee] focus:border-[#666666]"
                  >
                    <option value="">일</option>
                    {BIRTH_DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </AppSelect>
                </div>
              )}
            </AppFormField>
            <AppFormField label="성별" required error={errors.gender}>
              {() => (
                <div className="flex">
                  <AppButton
                    className={`flex-1 text-sm leading-[14px] transition-colors ${
                      gender === 'MALE'
                        ? 'border-[#a91201] text-[#a91201]'
                        : 'border-[#eeeeee] text-[#333333]'
                    }`}
                    onClick={() => setGender('MALE')}
                  >
                    남성
                  </AppButton>
                  <AppButton
                    className={`flex-1 text-sm leading-[14px] transition-colors ${
                      gender === 'FEMALE'
                        ? 'border-[#a91201] text-[#a91201]'
                        : 'border-[#eeeeee] text-[#333333]'
                    }`}
                    onClick={() => setGender('FEMALE')}
                  >
                    여성
                  </AppButton>
                </div>
              )}
            </AppFormField>
          </div>
        </BorderedSection>
        <BorderedSection className="border-b-0">
          <div className="px-[15px] py-[20px]">
            <div className="flex flex-col gap-[15px]">
              <div className="flex items-center justify-between">
                <span className="text-sm leading-[14px] text-[#666666]">푸시 알림 동의</span>
                <ToggleSwitch checked={pushNotification} onChange={setPushNotification} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm leading-[14px] text-[#666666]">마케팅 정보 수신</span>
                <ToggleSwitch checked={marketingNotification} onChange={setMarketingNotification} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm leading-[14px] text-[#666666]">이벤트 정보 수신</span>
                <ToggleSwitch checked={eventNotification} onChange={setEventNotification} />
              </div>
            </div>
            <div className="flex items-center justify-end mt-10">
              <Link
                href="/account/withdraw"
                className="flex items-center gap-1 text-[13px] leading-[13px] text-[#999999]"
              >
                회원탈퇴
                <Image src="/images/layout/nav-right.png" alt="" width={6} height={11} />
              </Link>
            </div>
            <div className="mt-5">
              <AppSubmitButton
                onClick={handleSubmit}
                isSubmitting={isSubmitting}
                loadingText="수정 중"
              >
                수정하기
              </AppSubmitButton>
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </>
  )
}
