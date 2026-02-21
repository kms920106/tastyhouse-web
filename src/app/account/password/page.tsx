'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PasswordChangePage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = () => {
    // TODO: 비밀번호 변경 API 연동
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => router.back()} className="p-2 -ml-2">
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
            비밀번호 변경
          </h1>
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* 현재 비밀번호 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">현재 비밀번호</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="현재 비밀번호를 입력해주세요."
            className="w-full px-4 py-4 text-[15px] text-gray-900 placeholder:text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">새 비밀번호</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새 비밀번호를 입력해주세요."
            className="w-full px-4 py-4 text-[15px] text-gray-900 placeholder:text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="mb-8">
          <label className="block mb-2 text-[15px] text-gray-900">새 비밀번호 확인</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="새 비밀번호를 확인해주세요."
            className="w-full px-4 py-4 text-[15px] text-gray-900 placeholder:text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
          />
        </div>

        {/* 확인 버튼 */}
        <div className="pb-6">
          <button
            onClick={handleSubmit}
            className="w-full py-4 text-[17px] font-medium text-white bg-[#D98686] rounded-lg hover:bg-[#D07676] active:bg-[#C86666] transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
