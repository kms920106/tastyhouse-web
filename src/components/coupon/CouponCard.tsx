import type { Coupon } from '@/domains/member'

interface CouponCardProps {
  coupon: Coupon
}

export default function CouponCard({ coupon }: CouponCardProps) {
  return (
    <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden mx-4 mb-3">
      {/* 왼쪽: 할인 포인트 */}
      <div className="flex flex-col items-center justify-center bg-white px-6 py-6 border-r border-gray-200">
        <div className="text-[28px] font-bold text-red-600">
          {coupon.discountPoints.toLocaleString()}p
        </div>
      </div>

      {/* 오른쪽: 쿠폰 정보 */}
      <div className="flex-1 px-4 py-4 flex flex-col justify-between">
        <div>
          <h3 className="text-[15px] text-gray-900 mb-1">{coupon.couponName}</h3>
          <p className="text-[13px] text-gray-500 mb-1">
            {coupon.minOrderAmount.toLocaleString()}원 이상 결제시
          </p>
          <p className="text-xs leading-[12px] text-gray-400">
            {coupon.startDate} ~ {coupon.endDate}
          </p>
        </div>
      </div>

      {/* D-day 표시 */}
      <div className="flex items-center justify-center px-5">
        <div className="text-base text-gray-700">D-{coupon.daysRemaining}</div>
      </div>
    </div>
  )
}
