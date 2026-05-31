'use client'

import Icon from '@/components/ui/Icon'
import { cn } from '@/lib/utils'
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
      <div className="bg-[#fcfcfc] border border-line rounded-[5px] shadow-[0.5px_0_4.5px_rgba(153,153,153,0.1)] p-5">
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => onChangeMonth(-1)}
            aria-label="이전 달"
            className="flex items-center justify-center w-[18px] h-[18px] rounded-[1.5px] bg-white border-[0.5px] border-[#eeeeee] shadow-[0.5px_0_4.5px_rgba(153,153,153,0.1)]"
          >
            <Icon name="calendar-prev" />
          </button>
          <span className="text-lg leading-[18px]">
            {formatYearMonth(viewMonth.year, viewMonth.month)}
          </span>
          <button
            onClick={() => onChangeMonth(1)}
            aria-label="다음 달"
            className="flex items-center justify-center w-[18px] h-[18px] rounded-[1.5px] bg-white border-[0.5px] border-[#eeeeee] shadow-[0.5px_0_4.5px_rgba(153,153,153,0.1)]"
          >
            <Icon name="calendar-next" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-3">
          {WEEKDAYS.map((day) => (
            <div key={day} className="text-sm leading-[14px] text-center text-black py-2">
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
                className="flex items-center justify-center h-[35px] w-full text-sm leading-[14px] disabled:cursor-not-allowed"
              >
                <span
                  className={cn(
                    'flex items-center justify-center w-[35px] h-[35px] rounded-[1.5px]',
                    isSelected && 'bg-main text-white shadow-[0.5px_0_4.5px_rgba(153,153,153,0.1)]',
                    cell.isToday && !isSelected && 'underline underline-offset-4 decoration-black',
                    isDisabled && 'text-[#cccccc]',
                    !isDisabled && !isSelected && cell.weekday === 0 && 'text-[#ed5151]',
                    !isDisabled && !isSelected && cell.weekday === 6 && 'text-[#499eff]',
                    !isDisabled &&
                      !isSelected &&
                      cell.weekday !== 0 &&
                      cell.weekday !== 6 &&
                      'text-black',
                  )}
                >
                  {cell.day}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-end gap-[15px] mt-4">
        <div className="flex items-center gap-[7px]">
          <div className="w-[13px] h-[13px] bg-main" />
          <span className="text-xs leading-[12px] text-[#666666]">선택</span>
        </div>
        <div className="flex items-center gap-[7px]">
          <div className="w-[13px] h-[13px] bg-[#f5f5f5]" />
          <span className="text-xs leading-[12px] text-[#666666]">예약불가</span>
        </div>
      </div>
    </div>
  )
}
