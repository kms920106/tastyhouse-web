'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppInputText from '@/components/ui/AppInputText'
import { toast } from '@/components/ui/AppToaster'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { useState } from 'react'
import type { Address } from 'react-daum-postcode'
import PostcodeModal from './PostcodeModal'

interface FormData {
  storeName: string
  address: string
  addressDetail: string
  name: string
  phoneNumber: string
  consultationTime: string
  agreeToTerms: boolean
}

interface FormErrors {
  storeName?: string
  address?: string
  addressDetail?: string
  name?: string
  phoneNumber?: string
  consultationTime?: string
}

export default function AdvertisingForm() {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    address: '',
    addressDetail: '',
    name: '',
    phoneNumber: '',
    consultationTime: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false)

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePostalCodeSearch = () => {
    setIsPostcodeOpen(true)
  }

  const handlePostcodeComplete = (data: Address) => {
    setFormData((prev) => ({
      ...prev,
      address: data.roadAddress || data.jibunAddress,
      addressDetail: '',
    }))
    setErrors((prev) => ({ ...prev, address: undefined }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.storeName.trim()) newErrors.storeName = '상호명을 입력해주세요.'
    if (!formData.address.trim()) newErrors.address = '주소를 검색해주세요.'
    if (!formData.addressDetail.trim()) newErrors.addressDetail = '상세주소를 입력해주세요.'
    if (!formData.name.trim()) newErrors.name = '성함을 입력해주세요.'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = '연락처를 입력해주세요.'
    if (!formData.consultationTime) newErrors.consultationTime = '상담신청시간을 선택해주세요.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    if (!formData.agreeToTerms) {
      toast('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    // TODO: 제출 API 연동
    console.log('제출:', formData)
    alert('제출되었습니다.')
  }

  return (
    <>
      {isPostcodeOpen && (
        <PostcodeModal
          onComplete={handlePostcodeComplete}
          onClose={() => setIsPostcodeOpen(false)}
        />
      )}

      <div className="px-[15px] py-[30px] flex flex-col gap-5">
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
        <AppFormField label="위치정보" required error={errors.address ?? errors.addressDetail}>
          {({ className }) => (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <AppInput
                  type="text"
                  value={formData.address}
                  readOnly
                  placeholder="도로명 주소를 검색해주세요."
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
                value={formData.addressDetail}
                onChange={(e) => handleChange('addressDetail', e.target.value)}
                placeholder="상세주소를 입력해주세요."
                className={
                  errors.addressDetail
                    ? 'border-[#bc4040] focus-visible:border-[#bc4040]'
                    : undefined
                }
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
        <label className="flex items-center gap-2.5 mt-[5px] cursor-pointer">
          <CircleCheckbox
            checked={formData.agreeToTerms}
            onChange={(value) => handleChange('agreeToTerms', value)}
          />
          <span className="text-sm leading-[14px], text-[#666666]">
            개인정보 수집 및 이용에 동의합니다. (필수)
          </span>
        </label>
      </div>
      <FixedBottomSection className="px-[15px] py-[15px]">
        <AppButton onClick={handleSubmit} className="text-white bg-[#a91201]">
          확인
        </AppButton>
      </FixedBottomSection>
    </>
  )
}
