'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import AppInput from '@/components/ui/AppInput'
import AppInputText from '@/components/ui/AppInputText'
import { toast } from '@/components/ui/AppToaster'
import CircleCheckbox from '@/components/ui/CircleCheckbox'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { createPartnershipRequest } from '@/services/partnership'
import { useState } from 'react'
import type { Address } from 'react-daum-postcode'
import PostcodeModal from './PostcodeModal'

const CONSULTATION_HOURS = ['09', '10', '11', '14', '15', '16', '17'] as const

interface FormData {
  businessName: string
  address: string
  addressDetail: string
  contactName: string
  contactPhone: string
  consultationDate: string
  consultationHour: string
  agreeToTerms: boolean
}

interface FormErrors {
  businessName?: string
  address?: string
  addressDetail?: string
  contactName?: string
  contactPhone?: string
  consultationDate?: string
  consultationHour?: string
}

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, '')
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
}

function buildConsultationDateTime(date: string, hour: string): string {
  return `${date}T${hour}:00:00`
}

const INITIAL_FORM_DATA: FormData = {
  businessName: '',
  address: '',
  addressDetail: '',
  contactName: '',
  contactPhone: '',
  consultationDate: '',
  consultationHour: '',
  agreeToTerms: false,
}

export default function AdvertisingForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)

  const [errors, setErrors] = useState<FormErrors>({})
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePhoneChange = (value: string) => {
    handleChange('contactPhone', formatPhoneNumber(value))
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
    const phonePattern = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/

    if (!formData.businessName.trim()) newErrors.businessName = '상호명을 입력해주세요.'
    if (!formData.address.trim()) newErrors.address = '주소를 검색해주세요.'
    if (!formData.addressDetail.trim()) newErrors.addressDetail = '상세주소를 입력해주세요.'
    if (!formData.contactName.trim()) newErrors.contactName = '성함을 입력해주세요.'
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = '연락처를 입력해주세요.'
    } else if (!phonePattern.test(formData.contactPhone)) {
      newErrors.contactPhone = '올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
    }
    if (!formData.consultationDate) newErrors.consultationDate = '상담 날짜를 선택해주세요.'
    if (!formData.consultationHour) newErrors.consultationHour = '상담 시간을 선택해주세요.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    if (!formData.agreeToTerms) {
      toast('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setIsSubmitting(true)
    try {
      // const { data, error } = await partnershipRepository.createPartnershipRequest({
      const { data, error } = await createPartnershipRequest({
        businessName: formData.businessName,
        address: formData.address,
        addressDetail: formData.addressDetail,
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        consultationRequestedAt: buildConsultationDateTime(
          formData.consultationDate,
          formData.consultationHour,
        ),
      })

      if (error || !data) {
        toast(error || '신청 중 오류가 발생했습니다.')
        return
      }

      toast('광고 및 제휴 신청이 완료되었습니다.')
      setFormData(INITIAL_FORM_DATA)
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <>
      {isPostcodeOpen && (
        <PostcodeModal
          onComplete={handlePostcodeComplete}
          onClose={() => setIsPostcodeOpen(false)}
        />
      )}
      <div className="px-[15px] py-[30px] flex flex-col gap-5">
        <AppFormField label="상호명" required error={errors.businessName}>
          {({ className }) => (
            <AppInputText
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="상호명을 입력해주세요."
              className={className}
            />
          )}
        </AppFormField>
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
                  onClick={() => setIsPostcodeOpen(true)}
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
        <AppFormField label="성명" required error={errors.contactName}>
          {({ className }) => (
            <AppInputText
              value={formData.contactName}
              onChange={(e) => handleChange('contactName', e.target.value)}
              placeholder="성함을 입력해주세요."
              className={className}
            />
          )}
        </AppFormField>
        <AppFormField label="연락처" required error={errors.contactPhone}>
          {({ className }) => (
            <AppInput
              type="tel"
              value={formData.contactPhone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="010-0000-0000"
              className={`pr-4 ${className ?? ''}`}
            />
          )}
        </AppFormField>
        <AppFormField
          label="상담신청시간"
          required
          error={errors.consultationDate ?? errors.consultationHour}
        >
          {({ className }) => (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  value={formData.consultationDate}
                  min={today}
                  onChange={(e) => handleChange('consultationDate', e.target.value)}
                  className={`w-full h-[50px] pl-[16px] pr-[16px] text-sm leading-[14px] border border-[#eeeeee] box-border bg-white focus:outline-none focus:border-[#666666] ${
                    !formData.consultationDate ? 'text-[#999999]' : 'text-[#333333]'
                  } ${errors.consultationDate ? 'border-[#bc4040] focus:border-[#bc4040]' : ''} ${className ?? ''}`}
                />
              </div>
              <div className="relative flex-1">
                <select
                  value={formData.consultationHour}
                  onChange={(e) => handleChange('consultationHour', e.target.value)}
                  className={`w-full h-[50px] pl-[16px] pr-[40px] text-sm leading-[14px] border border-[#eeeeee] box-border appearance-none bg-white focus:outline-none focus:border-[#666666] ${
                    !formData.consultationHour ? 'text-[#999999]' : 'text-[#333333]'
                  } ${errors.consultationHour ? 'border-[#bc4040] focus:border-[#bc4040]' : ''} ${className ?? ''}`}
                >
                  <option value="">시간 선택</option>
                  {CONSULTATION_HOURS.map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}:00 - {String(Number(hour) + 1).padStart(2, '0')}:00
                    </option>
                  ))}
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
        <AppButton
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="text-white bg-[#a91201]"
        >
          {isSubmitting ? '신청 중...' : '확인'}
        </AppButton>
      </FixedBottomSection>
    </>
  )
}
