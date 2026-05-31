export default function ReservationNotice() {
  return (
    <div className="px-[15px] py-6 border-t-[6px] border-line">
      <h2 className="mb-4 text-[17px]">예약시 주의사항 안내</h2>
      <div className="space-y-2 text-sm leading-[21px] text-[#666666]">
        <p>
          •&nbsp; 예약 인원 변경은 최소 하루 전날까지는 연락 부탁드리며, 예약, 매장 상황에 따라
          불가능할 수 있다는 점을 미리 알려드립니다.
        </p>
        <p>
          •&nbsp; 예약 시간기준 20분 경과 후 방문하지 않으시면 예약이 자동으로 취소되며, 예약시간
          변경 및 모든 문의는 꼭 미리 부탁드립니다.
        </p>
      </div>
    </div>
  )
}
