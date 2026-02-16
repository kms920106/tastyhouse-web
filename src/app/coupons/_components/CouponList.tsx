'use client'

import type { MemberCouponListItemResponse } from '@/domains/member'
import CouponCard from './CouponCard'

interface CouponListProps {
  coupons: MemberCouponListItemResponse[]
}

export default function CouponList({ coupons }: CouponListProps) {
  if (coupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 mb-4">
          <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
            <rect x="10" y="30" width="80" height="40" rx="5" />
            <circle cx="10" cy="50" r="5" className="fill-white" />
            <circle cx="90" cy="50" r="5" className="fill-white" />
            <line
              x1="10"
              y1="50"
              x2="90"
              y2="50"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </div>
        <p className="text-gray-400 text-[15px]">보유한 쿠폰이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  )
}
