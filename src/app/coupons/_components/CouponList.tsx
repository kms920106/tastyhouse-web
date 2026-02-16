import { memberService } from '@/domains/member'
import CouponCard from './CouponCard'

export default async function CouponList() {
  const coupons = await memberService.getMyCoupons()

  return (
    <div className="flex flex-col gap-5">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  )
}
