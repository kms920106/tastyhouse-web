'use client'

import type { MemberCouponListItemResponse } from '@/domains/member'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import Image from 'next/image'

interface CouponCardProps {
  coupon: MemberCouponListItemResponse
}

export default function CouponCard({ coupon }: CouponCardProps) {
  const isExpired = coupon.isUsed || coupon.daysRemaining < 0

  return (
    <div className="relative w-full">
      <Image
        src="/images/coupon/coupon.png"
        alt="쿠폰"
        width={690}
        height={285}
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex">
        {/* 왼쪽 영역 - 할인 정보 */}
        <div className="flex flex-col justify-center w-[70%] px-[20px] py-7 overflow-hidden">
          <span className="text-[21px] leading-[21px] text-[#a91201]">
            {coupon.discountType === 'AMOUNT'
              ? `${formatNumber(coupon.discountAmount)}p`
              : `${coupon.discountAmount}%`}
          </span>
          <span className={`mt-[15px] text-sm leading-[18px] ${isExpired ? 'text-gray-400' : ''}`}>
            {coupon.name}
          </span>
          <div className="flex flex-col gap-1 mt-2.5">
            {coupon.minOrderAmount > 0 && (
              <span className="text-xs leading-[14px] text-[#aaaaaa]">
                {formatNumber(coupon.minOrderAmount)}원 이상 결제시
              </span>
            )}
            {coupon.discountType === 'RATE' && coupon.maxDiscountAmount && (
              <span className="text-xs leading-[14px] text-[#aaaaaa]">
                최대 {formatNumber(coupon.maxDiscountAmount)}원 할인
              </span>
            )}
            <span className="text-xs leading-[14px] text-[#aaaaaa]">
              {formatDate(coupon.useStartAt, 'YYYY-MM-DD')} ~{' '}
              {formatDate(coupon.useEndAt, 'YYYY-MM-DD')}
            </span>
          </div>
        </div>

        {/* 오른쪽 영역 - 만료일 */}
        <div className="flex items-center justify-center w-[30%]">
          <span
            className={`text-base leading-[16px] ${isExpired ? 'text-gray-400' : 'text-[#666666]'}`}
          >
            {isExpired ? '만료' : `D-${coupon.daysRemaining}`}
          </span>
        </div>
      </div>
    </div>
  )
}
