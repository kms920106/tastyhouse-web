'use client'

import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const MORNING_TIMES = ['10:30', '11:00', '11:30']
const AFTERNOON_TIMES = [
  '12:00',
  '12:30',
  '1:00',
  '1:30',
  '2:00',
  '2:30',
  '3:00',
  '3:30',
  '4:00',
  '4:30',
  '5:00',
  '5:30',
  '6:00',
  '6:30',
  '7:00',
  '7:30',
]
const AGREEMENT_ITEMS = [
  '이용약관 동의(필수)',
  '개인정보처리방침 동의(필수)',
  '전자금융거래 이용약관 동의(필수)',
  '만 14세 이상 이용 동의(필수)',
  '이벤트 정보 수신 동의(선택)',
]

export default function ReservationDatePage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date(2021, 1, 11))
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2021, 1, 11))
  const [selectedTime, setSelectedTime] = useState<string>('1:00')
  const [guestCount, setGuestCount] = useState(1)
  const [requirements, setRequirements] = useState('')
  const [agreements, setAgreements] = useState<boolean[]>(
    new Array(AGREEMENT_ITEMS.length).fill(false),
  )
  const [allAgreed, setAllAgreed] = useState(false)

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDay = new Date(startDate)

    while (currentDay <= lastDay || currentDay.getDay() !== 0) {
      days.push(new Date(currentDay))
      currentDay.setDate(currentDay.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    if (date.getMonth() === currentDate.getMonth()) {
      setSelectedDate(date)
    }
  }

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const isSunday = (date: Date) => {
    return date.getDay() === 0
  }

  const isSaturday = (date: Date) => {
    return date.getDay() === 6
  }

  const isUnavailable = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dateStr = `${year}-${month}-${day}`
    const unavailableDates = ['2021-2-9', '2021-2-17', '2021-2-18', '2021-2-19', '2021-2-23']
    return unavailableDates.includes(dateStr)
  }

  const isTimeUnavailable = (time: string) => {
    const unavailableTimes = ['6:00', '6:30', '7:00', '7:30']
    return unavailableTimes.includes(time)
  }

  const incrementGuestCount = () => {
    setGuestCount(guestCount + 1)
  }

  const decrementGuestCount = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1)
    }
  }

  const handleAllAgree = () => {
    const newValue = !allAgreed
    setAllAgreed(newValue)
    setAgreements(new Array(AGREEMENT_ITEMS.length).fill(newValue))
  }

  const handleAgreementChange = (index: number) => {
    const newAgreements = [...agreements]
    newAgreements[index] = !newAgreements[index]
    setAgreements(newAgreements)
    setAllAgreed(newAgreements.every((agreed) => agreed))
  }

  const isBookingEnabled = () => {
    const requiredAgreements = agreements.slice(0, 4)
    return requiredAgreements.every((agreed) => agreed) && selectedDate && selectedTime
  }

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8L6 11L13 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-4 bg-white border-b border-[#eeeeee]">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <IoChevronBack size={24} />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px]">예약하기</h1>
      </header>

      <div className="px-6">
        <div className="py-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button onClick={handlePrevMonth} className="p-2">
              <IoChevronBack size={20} />
            </button>
            <div className="text-[20px]">
              {currentDate.getFullYear()}.{String(currentDate.getMonth() + 1).padStart(2, '0')}
            </div>
            <button onClick={handleNextMonth} className="p-2">
              <IoChevronBack size={20} className="rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-3">
            {WEEKDAYS.map((day, index) => (
              <div
                key={day}
                className={`text-sm leading-[14px] text-center py-2 ${
                  index === 0 ? 'text-[#ff0000]' : index === 6 ? 'text-[#0066ff]' : 'text-black'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-2">
            {calendarDays.map((date, index) => {
              const selected = isSelectedDate(date)
              const currentMonth = isCurrentMonth(date)
              const sunday = isSunday(date)
              const saturday = isSaturday(date)
              const unavailable = isUnavailable(date)

              let className = 'aspect-square flex items-center justify-center '
              if (selected) className += 'bg-[#d32f2f] text-white '
              if (!currentMonth) className += 'text-[#cccccc] '
              if (currentMonth && !selected && sunday) className += 'text-[#ff0000] '
              if (currentMonth && !selected && saturday) className += 'text-[#0066ff] '
              if (currentMonth && !selected && !sunday && !saturday) className += 'text-black '
              if (unavailable) className += 'text-[#cccccc] cursor-not-allowed '

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={!currentMonth || unavailable}
                  className={className}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#d32f2f]"></div>
              <span className="text-[13px] text-[#666666]">선택</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#f5f5f5]"></div>
              <span className="text-[13px] text-[#666666]">예약불가</span>
            </div>
          </div>
        </div>

        <div className="py-6 -mx-6 px-6 border-t-[6px] border-[#f5f5f5] box-border">
          <h2 className="mb-4 text-[17px]">오전</h2>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {MORNING_TIMES.map((time) => {
              const isSelected = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 text-[15px] border rounded ${
                    isSelected
                      ? 'border-[#d32f2f] text-[#d32f2f]'
                      : 'border-[#eeeeee] text-[#666666]'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>

          <h2 className="mb-4 text-[17px]">오후</h2>
          <div className="grid grid-cols-4 gap-3">
            {AFTERNOON_TIMES.map((time) => {
              const unavailable = isTimeUnavailable(time)
              const isSelected = selectedTime === time
              let className = 'py-3 text-[15px] border rounded '
              if (isSelected) className += 'border-[#d32f2f] text-[#d32f2f] '
              if (unavailable)
                className += 'border-[#eeeeee] bg-[#f5f5f5] text-[#cccccc] cursor-not-allowed '
              if (!unavailable && !isSelected)
                className += 'border-[#eeeeee] text-[#666666] hover:border-[#d32f2f] '

              return (
                <button
                  key={time}
                  onClick={() => !unavailable && setSelectedTime(time)}
                  disabled={unavailable}
                  className={className}
                >
                  {time}
                </button>
              )
            })}
          </div>
        </div>

        <div className="py-6 -mx-6 px-6 border-t-[6px] border-[#f5f5f5] box-border">
          <h2 className="mb-4 text-[17px]">인원</h2>
          <div className="flex items-center justify-between">
            <p className="text-[15px] text-[#666666]">방문하시는 인원을 선택해 주세요.</p>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementGuestCount}
                className="w-10 h-10 border border-[#eeeeee] box-border rounded flex items-center justify-center text-[20px] text-[#666666]"
              >
                -
              </button>
              <span className="text-[17px] w-8 text-center">{guestCount}</span>
              <button
                onClick={incrementGuestCount}
                className="w-10 h-10 border border-[#eeeeee] box-border rounded flex items-center justify-center text-[20px] text-[#666666]"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="py-6 -mx-6 px-6 border-t-[6px] border-[#f5f5f5] box-border">
          <h2 className="mb-4 text-[17px]">요청사항</h2>
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="업체에 요청하실 내용을 적어주세요."
            className="w-full h-32 p-4 border border-[#eeeeee] rounded text-[15px] placeholder:text-[#cccccc] resize-none"
          />
        </div>

        <div className="py-6 -mx-6 px-6 border-t-[6px] border-[#f5f5f5] box-border">
          <h2 className="mb-4 text-[17px]">예약시 주의사항 안내</h2>
          <div className="space-y-2 mb-6 text-sm leading-[14px] text-[#666666]">
            <p>
              • 예약 인원 변경은 최소 하루 전날까지는 연락 부탁드리며, 예약, 매장 상황에 따라
              불가능할 수있다는 점을 미리 알려드립니다.
            </p>
            <p>
              • 예약 시간기준 20분 경과 후 방문하지 않으시면 예약이 자동으로 취소되며, 예약시간 변경
              및 모든 문의는 꼭 미리 부탁드립니다.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-[#eeeeee]">
              <button
                onClick={handleAllAgree}
                className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center ${
                  allAgreed ? 'border-[#d32f2f] bg-[#d32f2f]' : 'border-[#cccccc]'
                }`}
              >
                {allAgreed && <CheckIcon />}
              </button>
              <span className="text-[15px]">약관에 모두 동의합니다.</span>
            </div>

            {AGREEMENT_ITEMS.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <button
                  onClick={() => handleAgreementChange(index)}
                  className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center ${
                    agreements[index] ? 'border-[#d32f2f] bg-[#d32f2f]' : 'border-[#cccccc]'
                  }`}
                >
                  {agreements[index] && <CheckIcon />}
                </button>
                <span className="text-sm leading-[14px] text-[#666666] flex-1">{item}</span>
                <button className="text-[13px] text-[#999999]">
                  <IoChevronBack size={16} className="rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FixedBottomSection>
        <button
          disabled={!isBookingEnabled()}
          className={`w-full py-4 text-[17px] rounded ${
            isBookingEnabled()
              ? 'bg-[#d32f2f] text-white'
              : 'bg-[#cccccc] text-white cursor-not-allowed'
          }`}
        >
          예약하기
        </button>
      </FixedBottomSection>
    </div>
  )
}
