interface Props {
  shopName: string
  summary: string
}

export default function ReservationShopSection({ shopName, summary }: Props) {
  return (
    <div className="px-[15px] pt-5 pb-[15px]">
      <h2 className="text-base leading-[16px] mb-[15px]">예약 매장</h2>
      <div className="flex flex-col gap-[10px]">
        <p className="text-base leading-[16px]">{shopName}</p>
        <p className="text-[13px] leading-[13px] text-[#888888]">{summary}</p>
      </div>
    </div>
  )
}
