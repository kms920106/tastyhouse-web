import { DiscountProductItemSkeleton } from '@/components/products/DiscountProductItemSkeleton'

export function HomeTodayDiscountProductListSkeleton() {
  return (
    <>
      <div className="mb-10 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {[...Array(4)].map((_, i) => (
          <DiscountProductItemSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
