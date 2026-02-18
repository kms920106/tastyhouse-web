'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function BugReportsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    shortcut: '',
    title: '',
    content: '',
    images: [] as File[],
  })

  const [errors, setErrors] = useState({
    shortcut: false,
    title: false,
    content: false,
  })

  const handleChange = (field: string, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const currentImages = formData.images

    if (currentImages.length + files.length > 5) {
      alert('사진은 최대 5장까지 업로드할 수 있습니다.')
      return
    }

    handleChange('images', [...currentImages, ...files])
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    handleChange('images', newImages)
  }

  const validateForm = () => {
    const newErrors = {
      shortcut: !formData.shortcut,
      title: !formData.title.trim(),
      content: !formData.content.trim(),
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    // TODO: 제출 API 연동
    console.log('제출:', formData)
    alert('버그 제보가 접수되었습니다.')
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
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">버그제보</h1>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="pt-14 pb-24">
        <div className="px-6 pt-6">
          {/* 단말기 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">단말기</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.shortcut}
                onChange={(e) => handleChange('shortcut', e.target.value)}
                className={`w-full px-4 py-3 border ${
                  errors.shortcut ? 'border-red-500' : 'border-gray-200'
                } rounded-lg text-[15px] appearance-none focus:outline-none focus:border-gray-900 ${
                  !formData.shortcut ? 'text-gray-400' : 'text-gray-900'
                }`}
              >
                <option value="">선택</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
                <option value="web">Web</option>
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

          {/* 제목 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">제목</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full px-4 py-3 border ${
                errors.title ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900`}
            />
          </div>

          {/* 내용 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">내용</span>
              <span className="text-[14px] text-red-500 ml-1">*</span>
            </label>
            <textarea
              placeholder="내용을 입력해주세요."
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={10}
              className={`w-full px-4 py-3 border ${
                errors.content ? 'border-red-500' : 'border-gray-200'
              } rounded-lg text-[15px] placeholder:text-gray-400 focus:outline-none focus:border-gray-900 resize-none`}
            />
          </div>

          {/* 사진 */}
          <div className="mb-6">
            <label className="block mb-2">
              <span className="text-[14px] text-gray-900">사진</span>
            </label>
            <div className="flex gap-3 overflow-x-auto">
              {/* 업로드 버튼 */}
              <label className="flex-shrink-0 w-24 h-24 border-2 border-gray-200 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer active:bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                />
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="text-gray-400 mb-1"
                >
                  <rect
                    x="8"
                    y="8"
                    width="24"
                    height="24"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="15" cy="16" r="2" fill="currentColor" />
                  <path
                    d="M8 26l6-6 4 4 6-6 8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[13px] text-gray-500">{formData.images.length}/5</span>
              </label>

              {/* 이미지 미리보기 */}
              {formData.images.map((image, index) => (
                <div key={index} className="relative flex-shrink-0 w-24 h-24">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    width={96}
                    height={96}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 안내 문구 */}
          <div className="mb-6">
            <p className="text-[14px] text-gray-500">
              아직 제보되지 않은 버그인 경우 1000포인트를 지급해드립니다.
            </p>
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
