'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/popover'
import { useState } from 'react'

export type TodayDiscountSortType = 'RECOMMENDED' | 'DISCOUNT_RATE' | 'PRICE_LOW' | 'PRICE_HIGH'

const SORT_OPTIONS: { label: string; value: TodayDiscountSortType }[] = [
  { label: '추천순', value: 'RECOMMENDED' },
  { label: '할인율 높은순', value: 'DISCOUNT_RATE' },
  { label: '낮은 가격순', value: 'PRICE_LOW' },
  { label: '높은 가격순', value: 'PRICE_HIGH' },
]

interface Props {
  value: TodayDiscountSortType
  onChange: (value: TodayDiscountSortType) => void
}

export default function TodayDiscountSortPopover({ value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === value)?.label ?? '추천순'

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="정렬 선택"
        className="flex items-center gap-1 text-sm leading-[14px] text-[#333333] cursor-pointer"
      >
        <span>{currentLabel}</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
          <path
            d="M1 1L4 4L7 1"
            stroke="#333333"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[140px] p-0 rounded-md border border-[#eeeeee] shadow-md"
      >
        <ul className="py-1">
          {SORT_OPTIONS.map(({ label, value: optionValue }) => (
            <li key={optionValue}>
              <button
                type="button"
                onClick={() => {
                  onChange(optionValue)
                  setOpen(false)
                }}
                className={`w-full px-4 py-2.5 text-left text-sm leading-[14px] cursor-pointer hover:bg-[#f5f5f5] ${
                  value === optionValue ? 'text-main font-bold' : 'text-[#333333]'
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
