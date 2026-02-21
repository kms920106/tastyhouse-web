'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AccountInfoPage() {
  const router = useRouter()

  // 상태 관리
  const [email, setEmail] = useState('kimcs1234@naver.com')
  const [name, setName] = useState('김철수')
  const [phone, setPhone] = useState('01012345678')
  const [birthYear, setBirthYear] = useState('2020')
  const [birthMonth, setBirthMonth] = useState('7')
  const [birthDay, setBirthDay] = useState('17')
  const [gender, setGender] = useState<'male' | 'female'>('female')
  const [pushNotification, setPushNotification] = useState(false)
  const [marketingNotification, setMarketingNotification] = useState(false)
  const [eventNotification, setEventNotification] = useState(false)

  const handleVerification = () => {
    // TODO: 인증번호 재발송 API 연동
  }

  const handleSubmit = () => {
    // TODO: 개인정보 수정 API 연동
  }

  const handleWithdrawal = () => {
    // 회원탈퇴 로직
    router.push('/account/withdrawal')
  }

  return (
    <div className="min-h-screen bg-white pb-20">
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
            개인정보수정
          </h1>
        </div>
      </header>

      <div className="px-6 pt-6">
        {/* 아이디 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">아이디</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요"
            className="w-full px-4 py-4 text-[15px] text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
            readOnly
          />
        </div>

        {/* 이름 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full px-4 py-4 text-[15px] text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
            readOnly
          />
        </div>

        {/* 휴대폰번호 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">휴대폰번호</label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              className="flex-1 px-4 py-4 text-[15px] text-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none"
              readOnly
            />
            <button
              onClick={handleVerification}
              className="px-6 py-4 text-[15px] text-gray-900 bg-white border border-gray-300 rounded-lg whitespace-nowrap hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              재발송
            </button>
          </div>
        </div>

        {/* 생년월일 */}
        <div className="mb-6">
          <label className="block mb-2 text-[15px] text-gray-900">생년월일</label>
          <div className="flex gap-2">
            {/* 년 */}
            <div className="flex-1 relative">
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-full px-4 py-4 text-[15px] text-gray-900 bg-gray-50 border-0 rounded-lg appearance-none focus:outline-none"
              >
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
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

            {/* 월 */}
            <div className="flex-1 relative">
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-full px-4 py-4 text-[15px] text-gray-900 bg-gray-50 border-0 rounded-lg appearance-none focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
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

            {/* 일 */}
            <div className="flex-1 relative">
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-full px-4 py-4 text-[15px] text-gray-900 bg-gray-50 border-0 rounded-lg appearance-none focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
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
        </div>

        {/* 성별 */}
        <div className="mb-8">
          <label className="block mb-2 text-[15px] text-gray-900">성별</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-4 text-[15px] rounded-lg transition-colors ${
                gender === 'male'
                  ? 'text-gray-900 bg-white border-2 border-gray-900'
                  : 'text-gray-900 bg-white border border-gray-300'
              }`}
            >
              남성
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-4 text-[15px] rounded-lg transition-colors ${
                gender === 'female'
                  ? 'text-[#D32F2F] bg-white border-2 border-[#D32F2F]'
                  : 'text-gray-900 bg-white border border-gray-300'
              }`}
            >
              여성
            </button>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="space-y-4 mb-8">
          {/* 푸시 알림 동의 */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-gray-900">푸시 알림 동의</span>
            <label className="relative inline-block w-[51px] h-[31px]">
              <input
                type="checkbox"
                checked={pushNotification}
                onChange={(e) => setPushNotification(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-[#4CD964] transition-colors cursor-pointer">
                <div
                  className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform ${
                    pushNotification ? 'translate-x-[20px]' : ''
                  }`}
                />
              </div>
            </label>
          </div>

          {/* 마케팅 정보 수신 */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-gray-900">마케팅 정보 수신</span>
            <label className="relative inline-block w-[51px] h-[31px]">
              <input
                type="checkbox"
                checked={marketingNotification}
                onChange={(e) => setMarketingNotification(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-[#4CD964] transition-colors cursor-pointer">
                <div
                  className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform ${
                    marketingNotification ? 'translate-x-[20px]' : ''
                  }`}
                />
              </div>
            </label>
          </div>

          {/* 이벤트 정보 수신 */}
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-gray-900">이벤트 정보 수신</span>
            <label className="relative inline-block w-[51px] h-[31px]">
              <input
                type="checkbox"
                checked={eventNotification}
                onChange={(e) => setEventNotification(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-[#4CD964] transition-colors cursor-pointer">
                <div
                  className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform ${
                    eventNotification ? 'translate-x-[20px]' : ''
                  }`}
                />
              </div>
            </label>
          </div>
        </div>

        {/* 회원탈퇴 링크 */}
        <div className="mb-8">
          <button
            onClick={handleWithdrawal}
            className="flex items-center justify-between w-full text-[15px] text-gray-500"
          >
            <span>회원탈퇴</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 4l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* 수정하기 버튼 */}
        <div className="pb-6">
          <button
            onClick={handleSubmit}
            className="w-full py-4 text-[17px] font-medium text-white bg-[#D32F2F] rounded-lg hover:bg-[#C62828] active:bg-[#B71C1C] transition-colors"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  )
}
