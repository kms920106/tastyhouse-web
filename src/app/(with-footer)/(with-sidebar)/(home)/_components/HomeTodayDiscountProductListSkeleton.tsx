import { ProductItemSkeleton } from '@/components/products/ProductItemSkeleton'

export function HomeTodayDiscountProductListSkeleton() {
  return (
    <>
      <div className="mb-10 divide-y divide-[#eeeeee] border-y border-[#eeeeee]">
        {[...Array(4)].map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
