'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdvertisingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    storeName: '',
    postalCode: '',
    address: '',
    name: '',
    phoneNumber: '',
    consultationTime: '',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState({
    storeName: false,
    postalCode: false,
    address: false,
    name: false,
    phoneNumber: false,
    consultationTime: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handlePostalCodeSearch = () => {
    // TODO: 우편번호 검색 API 연동
    console.log('우편번호 검색')
  }

  const validateForm = () => {
    const newErrors = {
      storeName: !formData.storeName.trim(),
      postalCode: !formData.postalCode.trim(),
      address: !formData.address.trim(),
      name: !formData.name.trim(),
      phoneNumber: !formData.phoneNumber.trim(),
      consultationTime: !formData.consultationTime,
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    if (!formData.agreeToTerms) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    // TODO: 제출 API 연동
    console.log('제출:', formData)
    alert('제출되었습니다.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="relative flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2" aria-label="뒤로가기">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">
            광고 및 제휴
          </h1>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="pt-14 pb-24">
        {/* 안내 섹션 */}
        <div className="px-6 py-6 bg-gray-50">
          <h2 className="text-base font-medium text-gray-900 mb-4">
            광고 및 제휴 상담신청 유의사항
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-[14px] text-gray-600 leading-relaxed">
                • 먼저 신청하신 고객님의 상담이 지연될 경우 희망시간대보다 늦게 전화를 드릴 수
                있습니다.
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-[14px] text-gray-600 leading-relaxed">
                • 등록하신 전화번호는 상담 관련 이외에는 사용되지 않으며, 기존에 등록하신 번호는
                변경되지 않습니다.
              </span>
            </div>
          </div>
        </div>

        {/* 폼 섹션 */}
        <div className="px-6 pt-6">
          {/* 상호명 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">상호명</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="상호명을 입력해주세요."
              value={formData.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.storeName ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900`}
            />
          </div>

          {/* 위치정보 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">위치정보</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder=""
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                readOnly
                className={`flex-1 px-4 py-3 border ${
                  errors.postalCode ? 'border-red-500' : 'border-gray-200'
                } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900 bg-gray-50`}
              />
              <button
                type="button"
                onClick={handlePostalCodeSearch}
                className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-[15px] text-gray-900 whitespace-nowrap active:bg-gray-50"
              >
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              placeholder="상세주소를 입력해주세요."
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.address ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900`}
            />
          </div>

          {/* 성명 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">성명</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="성함을 입력해주세요."
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900`}
            />
          </div>

          {/* 연락처 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">연락처</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <input
              type="tel"
              placeholder="숫자만 입력해주세요."
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value.replace(/[^0-9]/g, ''))}
              className={`w-full px-4 py-3 border ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900`}
            />
          </div>

          {/* 상담신청시간 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">상담신청시간</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.consultationTime}
                onChange={(e) => handleChange('consultationTime', e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.consultationTime ? 'border-red-500' : 'border-gray-200'
                } rounded-lg text-[15px] appearance-none focus:outline-none focus:border-gray-900 ${
                  !formData.consultationTime ? 'text-gray-400' : 'text-gray-900'
                }`}
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
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
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

          {/* 개인정보 동의 */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#E87167] peer-checked:border-[#E87167] transition-colors flex items-center justify-center">
                  {formData.agreeToTerms && (
                    <svg
                      width="14"
                      height="11"
                      viewBox="0 0 14 11"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 5.5l4 4 8-8" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[14px] text-gray-600 leading-relaxed">
                개인정보 수집 및 이용에 동의합니다. (필수)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#E87167] text-white text-base font-medium py-4 rounded-lg active:bg-[#D86157] transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  )
}
