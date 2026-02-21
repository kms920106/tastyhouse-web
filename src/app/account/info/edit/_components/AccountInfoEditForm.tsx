'use client'

import AppButton from '@/components/ui/AppButton'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Gender = 'male' | 'female'

const BIRTH_YEARS = Array.from({ length: 100 }, (_, i) => 2024 - i)
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
    <label className="relative inline-block w-[51px] h-[31px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-full h-full bg-gray-200 rounded-full peer-checked:bg-[#4CD964] transition-colors cursor-pointer">
        <div
          className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-[20px]' : ''
          }`}
        />
      </div>
    </label>
  )
}

export default function AccountInfoEditForm() {
  const router = useRouter()

  // TODO: API에서 실제 회원 정보 조회로 교체
  const [email] = useState('kimcs1234@naver.com')
  const [name] = useState('김철수')
  const [phone, setPhone] = useState('01012345678')
  const [birthYear, setBirthYear] = useState('2020')
  const [birthMonth, setBirthMonth] = useState('7')
  const [birthDay, setBirthDay] = useState('17')
  const [gender, setGender] = useState<Gender>('female')
  const [pushNotification, setPushNotification] = useState(false)
  const [marketingNotification, setMarketingNotification] = useState(false)
  const [eventNotification, setEventNotification] = useState(false)

  const handleVerification = () => {
    // TODO: 휴대폰 인증번호 재발송 API 연동
  }

  const handleSubmit = () => {
    // TODO: 개인정보 수정 API 연동
  }

  const handleWithdraw = () => {
    router.push('/account/withdraw')
  }

  return (
    <div className="px-[15px] pt-[20px] pb-[70px]">
      {/* 아이디 */}
      <div className="mb-5">
        <label className="block mb-2.5 text-xs text-gray-900">아이디</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full h-[50px] px-4 text-sm text-gray-400 bg-gray-50 border border-[#eeeeee] focus:outline-none"
        />
      </div>

      {/* 이름 */}
      <div className="mb-5">
        <label className="block mb-2.5 text-xs text-gray-900">이름</label>
        <input
          type="text"
          value={name}
          readOnly
          className="w-full h-[50px] px-4 text-sm text-gray-400 bg-gray-50 border border-[#eeeeee] focus:outline-none"
        />
      </div>

      {/* 휴대폰번호 */}
      <div className="mb-5">
        <label className="block mb-2.5 text-xs text-gray-900">휴대폰번호</label>
        <div className="flex gap-2">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01012345678"
            className="flex-1 h-[50px] px-4 text-sm text-gray-900 bg-white border border-[#eeeeee] focus:outline-none focus:border-[#666666]"
          />
          <button
            onClick={handleVerification}
            className="h-[50px] px-5 text-sm text-gray-900 bg-white border border-[#eeeeee] whitespace-nowrap hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            재발송
          </button>
        </div>
      </div>

      {/* 생년월일 */}
      <div className="mb-5">
        <label className="block mb-2.5 text-xs text-gray-900">생년월일</label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full h-[50px] px-4 text-sm text-gray-900 bg-white border border-[#eeeeee] appearance-none focus:outline-none focus:border-[#666666]"
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
              className="w-full h-[50px] px-4 text-sm text-gray-900 bg-white border border-[#eeeeee] appearance-none focus:outline-none focus:border-[#666666]"
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
              className="w-full h-[50px] px-4 text-sm text-gray-900 bg-white border border-[#eeeeee] appearance-none focus:outline-none focus:border-[#666666]"
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
      </div>

      {/* 성별 */}
      <div className="mb-8">
        <label className="block mb-2.5 text-xs text-gray-900">성별</label>
        <div className="flex gap-2">
          <button
            onClick={() => setGender('male')}
            className={`flex-1 h-[50px] text-sm transition-colors ${
              gender === 'male'
                ? 'text-gray-900 bg-white border-2 border-gray-900'
                : 'text-gray-900 bg-white border border-[#eeeeee]'
            }`}
          >
            남성
          </button>
          <button
            onClick={() => setGender('female')}
            className={`flex-1 h-[50px] text-sm transition-colors ${
              gender === 'female'
                ? 'text-[#D32F2F] bg-white border-2 border-[#D32F2F]'
                : 'text-gray-900 bg-white border border-[#eeeeee]'
            }`}
          >
            여성
          </button>
        </div>
      </div>

      {/* 알림 설정 */}
      <div className="space-y-5 mb-8 border-t border-[#eeeeee] pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">푸시 알림 동의</span>
          <ToggleSwitch checked={pushNotification} onChange={setPushNotification} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">마케팅 정보 수신</span>
          <ToggleSwitch checked={marketingNotification} onChange={setMarketingNotification} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-900">이벤트 정보 수신</span>
          <ToggleSwitch checked={eventNotification} onChange={setEventNotification} />
        </div>
      </div>

      {/* 회원탈퇴 */}
      <div className="border-t border-[#eeeeee] pt-5 mb-8">
        <button
          onClick={handleWithdraw}
          className="flex items-center justify-between w-full text-sm text-gray-500"
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
      <div className="fixed bottom-0 left-0 right-0">
        <AppButton
          onClick={handleSubmit}
          className="text-white bg-[#D32F2F] rounded-none"
        >
          수정하기
        </AppButton>
      </div>
    </div>
  )
}
