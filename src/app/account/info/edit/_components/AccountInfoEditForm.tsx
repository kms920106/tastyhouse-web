'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppOutlineButton from '@/components/ui/AppOutlineButton'
import AppSubmitButton from '@/components/ui/AppSubmitButton'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Gender = 'male' | 'female'

const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2026 - i)
const BIRTH_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const BIRTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1)

const ChevronDownIcon = () => (
  <svg
    className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

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

export default function AccountInfoEditForm() {
  // TODO: API에서 실제 회원 정보 조회로 교체
  const [email] = useState('kimcs1234@naver.com')
  const [name, setName] = useState('김철수')
  const [phone, setPhone] = useState('01087654321')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerificationVisible, setIsVerificationVisible] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [birthYear, setBirthYear] = useState('2020')
  const [birthMonth, setBirthMonth] = useState('7')
  const [birthDay, setBirthDay] = useState('17')
  const [gender, setGender] = useState<Gender>('female')
  const [pushNotification, setPushNotification] = useState(true)
  const [marketingNotification, setMarketingNotification] = useState(true)
  const [eventNotification, setEventNotification] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendVerification = () => {
    // TODO: 인증번호 발송 API 연동
    setIsVerificationVisible(true)
  }

  const handleConfirmVerification = () => {
    // TODO: 인증번호 확인 API 연동
    setIsVerified(true)
  }

  const handleSubmit = async () => {
    // TODO: 개인정보 수정 API 연동
    setIsSubmitting(true)
    try {
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
            <AppFormField label="아이디">
              {() => (
                <AppInput
                  type="email"
                  value={email}
                  readOnly
                  className="pr-4 bg-[#f8f8f8] text-[#aaaaaa]"
                />
              )}
            </AppFormField>
            <AppFormField label="이름">
              {() => (
                <AppInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해주세요."
                  className="pr-4"
                />
              )}
            </AppFormField>
            <AppFormField label="휴대폰번호">
              {() => (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <AppInput
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={isVerified}
                      placeholder="01012345678"
                      disabled={isVerified}
                      className={`flex-1 pr-4 ${isVerified ? 'bg-[#f8f8f8] text-[#aaaaaa]' : ''}`}
                    />
                    <AppOutlineButton
                      onClick={handleSendVerification}
                      disabled={isVerified}
                      className="shrink-0 w-auto px-4"
                    >
                      재발송
                    </AppOutlineButton>
                  </div>
                  {isVerificationVisible && (
                    <div className="flex gap-2">
                      <AppInput
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        readOnly={isVerified}
                        disabled={isVerified}
                        placeholder="123456"
                        className={`flex-1 pr-4 ${isVerified ? 'bg-[#f8f8f8] text-[#aaaaaa]' : ''}`}
                      />
                      <AppOutlineButton
                        className="shrink-0 w-auto px-4"
                        onClick={handleConfirmVerification}
                        disabled={isVerified}
                      >
                        확인
                      </AppOutlineButton>
                    </div>
                  )}
                  {isVerified && (
                    <p className="text-xs leading-[12px] text-[#666666]">인증이 완료되었습니다.</p>
                  )}
                </div>
              )}
            </AppFormField>
            <AppFormField label="생년월일">
              {() => (
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full h-[50px] pl-4 pr-10 text-sm leading-[14px] text-[#333333] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666]"
                    >
                      {BIRTH_YEARS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon />
                  </div>
                  <div className="flex-1 relative">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full h-[50px] pl-4 pr-10 text-sm leading-[14px] text-[#333333] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666]"
                    >
                      {BIRTH_MONTHS.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon />
                  </div>
                  <div className="flex-1 relative">
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full h-[50px] pl-4 pr-10 text-sm leading-[14px] text-[#333333] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666]"
                    >
                      {BIRTH_DAYS.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon />
                  </div>
                </div>
              )}
            </AppFormField>
            <AppFormField label="성별">
              {() => (
                <div className="flex">
                  <AppButton
                    className={`flex-1 text-sm leading-[14px] transition-colors ${
                      gender === 'male'
                        ? 'border-[#a91201] text-[#a91201]'
                        : 'border-[#eeeeee] text-[#333333]'
                    }`}
                    onClick={() => setGender('male')}
                  >
                    남성
                  </AppButton>
                  <AppButton
                    className={`flex-1 text-sm leading-[14px] transition-colors ${
                      gender === 'female'
                        ? 'border-[#a91201] text-[#a91201]'
                        : 'border-[#eeeeee] text-[#333333]'
                    }`}
                    onClick={() => setGender('female')}
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
