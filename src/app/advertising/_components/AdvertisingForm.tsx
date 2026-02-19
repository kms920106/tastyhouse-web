'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppInputText from '@/components/ui/AppInputText'
import { useState } from 'react'

interface FormData {
  storeName: string
  postalCode: string
  address: string
  name: string
  phoneNumber: string
  consultationTime: string
  agreeToTerms: boolean
}

interface FormErrors {
  storeName?: string
  postalCode?: string
  address?: string
  name?: string
  phoneNumber?: string
  consultationTime?: string
}

export default function AdvertisingForm() {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    postalCode: '',
    address: '',
    name: '',
    phoneNumber: '',
    consultationTime: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePostalCodeSearch = () => {
    // TODO: 우편번호 검색 API 연동
    console.log('우편번호 검색')
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.storeName.trim()) newErrors.storeName = '상호명을 입력해주세요.'
    if (!formData.postalCode.trim()) newErrors.postalCode = '우편번호를 검색해주세요.'
    if (!formData.address.trim()) newErrors.address = '상세주소를 입력해주세요.'
    if (!formData.name.trim()) newErrors.name = '성함을 입력해주세요.'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = '연락처를 입력해주세요.'
    if (!formData.consultationTime) newErrors.consultationTime = '상담신청시간을 선택해주세요.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    if (!formData.agreeToTerms) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    // TODO: 제출 API 연동
    console.log('제출:', formData)
    alert('제출되었습니다.')
  }

  return (
    <>
      {/* 안내 섹션 */}
      <div className="px-[15px] py-5 bg-[#f8f8f8] border-b border-[#eeeeee]">
        <h2 className="text-[13px] font-bold text-[#333333] mb-3">
          광고 및 제휴 상담신청 유의사항
        </h2>
        <ul className="space-y-2">
          <li className="text-[13px] text-[#666666] leading-relaxed">
            • 먼저 신청하신 고객님의 상담이 지연될 경우 희망시간대보다 늦게 전화를 드릴 수
            있습니다.
          </li>
          <li className="text-[13px] text-[#666666] leading-relaxed">
            • 등록하신 전화번호는 상담 관련 이외에는 사용되지 않으며, 기존에 등록하신 번호는
            변경되지 않습니다.
          </li>
        </ul>
      </div>

      {/* 폼 섹션 */}
      <div className="flex flex-col gap-5 px-[15px] py-5">
        {/* 상호명 */}
        <AppFormField label="상호명" required error={errors.storeName}>
          {({ className }) => (
            <AppInputText
              value={formData.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              placeholder="상호명을 입력해주세요."
              className={className}
            />
          )}
        </AppFormField>

        {/* 위치정보 */}
        <AppFormField label="위치정보" required error={errors.postalCode ?? errors.address}>
          {({ className }) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <AppInput
                  type="text"
                  value={formData.postalCode}
                  readOnly
                  className={`flex-1 pr-4 bg-white ${className ?? ''}`}
                />
                <button
                  type="button"
                  onClick={handlePostalCodeSearch}
                  className="shrink-0 h-[50px] px-4 border border-[#eeeeee] box-border text-[13px] text-[#333333] whitespace-nowrap bg-[#f8f8f8] active:bg-[#eeeeee]"
                >
                  우편번호 검색
                </button>
              </div>
              <AppInputText
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="상세주소를 입력해주세요."
                className={errors.address ? 'border-[#bc4040] focus-visible:border-[#bc4040]' : undefined}
              />
            </div>
          )}
        </AppFormField>

        {/* 성명 */}
        <AppFormField label="성명" required error={errors.name}>
          {({ className }) => (
            <AppInputText
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="성함을 입력해주세요."
              className={className}
            />
          )}
        </AppFormField>

        {/* 연락처 */}
        <AppFormField label="연락처" required error={errors.phoneNumber}>
          {({ className }) => (
            <AppInput
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="숫자만 입력해주세요."
              className={`pr-4 ${className ?? ''}`}
            />
          )}
        </AppFormField>

        {/* 상담신청시간 */}
        <AppFormField label="상담신청시간" required error={errors.consultationTime}>
          {({ className }) => (
            <div className="relative">
              <select
                value={formData.consultationTime}
                onChange={(e) => handleChange('consultationTime', e.target.value)}
                className={`w-full h-[50px] pl-[16px] pr-[40px] text-sm leading-[14px] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666] ${
                  !formData.consultationTime ? 'text-[#999999]' : 'text-[#333333]'
                } ${className ?? ''}`}
              >
                <option value="">선택</option>
                <option value="09:00-10:00">09:00 - 10:00</option>
                <option value="10:00-11:00">10:00 - 11:00</option>
                <option value="11:00-12:00">11:00 - 12:00</option>
                <option value="14:00-15:00">14:00 - 15:00</option>
                <option value="15:00-16:00">15:00 - 16:00</option>
                <option value="16:00-17:00">16:00 - 17:00</option>
                <option value="17:00-18:00">17:00 - 18:00</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#999999]"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 7.5l5 5 5-5" />
              </svg>
            </div>
          )}
        </AppFormField>

        {/* 개인정보 동의 */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div className="relative flex items-center justify-center shrink-0 w-5 h-5">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-5 h-5 border-2 border-[#cccccc] rounded-full peer-checked:bg-[#E87167] peer-checked:border-[#E87167] transition-colors flex items-center justify-center">
              {formData.agreeToTerms && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 14 11"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 5.5l4 4 8-8" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-[13px] text-[#666666]">개인정보 수집 및 이용에 동의합니다. (필수)</span>
        </label>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eeeeee] px-[15px] py-[15px]">
        <AppButton onClick={handleSubmit} className="text-white bg-[#E87167] rounded-lg active:bg-[#D86157]">
          확인
        </AppButton>
      </div>
    </>
  )
}
