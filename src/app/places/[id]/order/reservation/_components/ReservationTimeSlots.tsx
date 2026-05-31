'use client'

import { cn } from '@/lib/utils'

interface Props {
  selectedTime: string | null
  onSelectTime: (time: string) => void
}

interface TimeSlotButtonProps {
  time: string
  selected: boolean
  onSelect: (time: string) => void
  disabled?: boolean
}

// 예약불가 비활성 스타일 — API 연동 시 disabled prop으로 토글
// 'border-[#eee] bg-[#eee] text-[#cccccc] cursor-not-allowed'
function TimeSlotButton({ time, selected, onSelect, disabled }: TimeSlotButtonProps) {
  return (
    <button
      onClick={() => !disabled && onSelect(time)}
      disabled={disabled}
      className={cn(
        'py-3 text-[15px] border rounded-[1px]',
        disabled
          ? 'border-[#eee] bg-[#eee] text-[#cccccc] cursor-not-allowed'
          : selected
            ? 'border-main bg-[#f8f5f4] text-main'
            : 'border-line text-[#666666]',
      )}
    >
      {time}
    </button>
  )
}

const AM_SLOTS = ['10:30', '11:00', '11:30']
const PM_SLOTS = [
  '12:00', '12:30', '1:00', '1:30', '2:00', '2:30',
  '3:00', '3:30', '4:00', '4:30', '5:00', '5:30',
  '6:00', '6:30', '7:00', '7:30',
]

export default function ReservationTimeSlots({ selectedTime, onSelectTime }: Props) {
  return (
    <div className="px-[15px] py-6 border-t-[6px] border-line">
      <h2 className="mb-4 text-[17px]">오전</h2>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {AM_SLOTS.map((time) => (
          <TimeSlotButton
            key={time}
            time={time}
            selected={selectedTime === time}
            onSelect={onSelectTime}
          />
        ))}
      </div>

      <h2 className="mb-4 text-[17px]">오후</h2>
      <div className="grid grid-cols-4 gap-3">
        {PM_SLOTS.map((time) => (
          <TimeSlotButton
            key={time}
            time={time}
            selected={selectedTime === time}
            onSelect={onSelectTime}
          />
        ))}
      </div>
    </div>
  )
}
