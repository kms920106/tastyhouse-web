import { memberRepository } from '@/domains/member/member.repository'
import CouponCard from './CouponCard'

export default async function CouponList() {
  const { data } = await memberRepository.getMyCoupons()

  return (
    <div className="flex flex-col gap-5">
      {data?.map((coupon) => (
        <CouponCard key={coupon.id} memberCoupon={coupon} />
      ))}
    </div>
  )
}
