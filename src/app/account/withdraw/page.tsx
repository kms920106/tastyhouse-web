'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function WithdrawPage() {
  const router = useRouter()
  const [reason, setReason] = useState('선택')

  const handleWithdraw = () => {
    // TODO: 회원탈퇴 API 연동
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
            회원탈퇴
          </h1>
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* 안내 문구 */}
        <div className="mb-6">
          <p className="text-[15px] text-gray-900 leading-relaxed mb-4">
            회원탈퇴시 아래 사항을 숙지하시기 바랍니다.
          </p>

          <div className="space-y-2">
            <p className="text-[14px] text-gray-700 leading-relaxed">
              1.회원 탈퇴시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서 소비자 보호에 관한 법률에 의거해 고객정보 보호정책에 따라 관리됩니다.
            </p>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              2.탈퇴시 고객님께서 보유하셨던 적립금은 모두 삭제됩니다.
            </p>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              3.회원 탈퇴 후 30일간 재가입이 불가능합니다.
            </p>
          </div>
        </div>

        {/* 탈퇴사유 */}
        <div className="mb-8">
          <label className="block mb-2 text-[15px] text-gray-900">탈퇴사유</label>
          <div className="relative">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-4 text-[15px] text-gray-900 bg-gray-50 border-0 rounded-lg appearance-none focus:outline-none"
            >
              <option value="선택">선택</option>
              <option value="서비스 이용 불편">서비스 이용 불편</option>
              <option value="개인정보 보호">개인정보 보호</option>
              <option value="사용 빈도 낮음">사용 빈도 낮음</option>
              <option value="기타">기타</option>
            </select>
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
          </div>
        </div>

        {/* 탈퇴하기 버튼 */}
        <div className="pb-6">
          <button
            onClick={handleWithdraw}
            className="w-full py-4 text-[17px] font-medium text-white bg-[#D32F2F] rounded-lg hover:bg-[#C62828] active:bg-[#B71C1C] transition-colors"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  )
}
