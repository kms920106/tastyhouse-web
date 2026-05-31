'use client'

interface Props {
  count: number
  onChange: (next: number) => void
  max?: number
}

export default function ReservationGuestCounter({ count, onChange, max = 50 }: Props) {
  return (
    <div className="px-[15px] py-6">
      <h2 className="mb-4 text-[17px]">인원</h2>
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-[#666666]">방문하시는 인원을 선택해주세요.</p>
        <div className="flex items-center border border-line">
          <button
            onClick={() => onChange(Math.max(1, count - 1))}
            className="w-[30px] h-[30px] flex items-center justify-center text-sm leading-[14px] text-[#999999]"
            aria-label="인원 감소"
          >
            −
          </button>
          <span className="w-[30px] h-[30px] flex items-center justify-center text-xs leading-[12px] border-x border-line box-border">
            {count}
          </span>
          <button
            onClick={() => onChange(Math.min(max, count + 1))}
            className="w-[30px] h-[30px] flex items-center justify-center text-sm leading-[14px] text-[#999999]"
            aria-label="인원 증가"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
