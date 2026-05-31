'use client'

import { cn } from '@/lib/utils'
import { IoChevronBack } from 'react-icons/io5'
import { buildMonthGrid, formatYearMonth } from '../_lib/calendar'

interface Props {
  viewMonth: { year: number; month: number }
  selectedDate: string | null
  onChangeMonth: (delta: number) => void
  onSelectDate: (date: string) => void
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export default function ReservationCalendar({
  viewMonth,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}: Props) {
  const cells = buildMonthGrid(viewMonth.year, viewMonth.month)

  return (
    <div className="px-[15px] py-6">
      <div className="flex items-center justify-center gap-4 mb-6">
        <button onClick={() => onChangeMonth(-1)} aria-label="이전 달" className="p-2">
          <IoChevronBack size={20} />
        </button>
        <span className="text-[20px]">{formatYearMonth(viewMonth.year, viewMonth.month)}</span>
        <button onClick={() => onChangeMonth(1)} aria-label="다음 달" className="p-2">
          <IoChevronBack size={20} className="rotate-180" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-3">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={cn(
              'text-sm leading-[14px] text-center py-2',
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-black',
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {cells.map((cell, index) => {
          if (!cell.date || cell.day === null) {
            return <div key={index} />
          }

          const isSelected = cell.date === selectedDate
          const isDisabled = cell.isPast

          return (
            <button
              key={cell.date}
              onClick={() => !isDisabled && onSelectDate(cell.date!)}
              disabled={isDisabled}
              aria-label={`${viewMonth.year}년 ${viewMonth.month + 1}월 ${cell.day}일`}
              aria-pressed={isSelected}
              aria-current={isSelected ? 'date' : undefined}
              className={cn(
                'aspect-square flex items-center justify-center text-sm',
                isSelected && 'bg-main text-white',
                isDisabled && 'text-[#cccccc] cursor-not-allowed',
                !isDisabled && !isSelected && cell.weekday === 0 && 'text-red-500',
                !isDisabled && !isSelected && cell.weekday === 6 && 'text-blue-500',
                !isDisabled &&
                  !isSelected &&
                  cell.weekday !== 0 &&
                  cell.weekday !== 6 &&
                  'text-black',
              )}
            >
              {cell.day}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-main" />
          <span className="text-[13px] text-[#666666]">선택</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#f5f5f5]" />
          <span className="text-[13px] text-[#666666]">예약불가</span>
        </div>
      </div>
    </div>
  )
}
