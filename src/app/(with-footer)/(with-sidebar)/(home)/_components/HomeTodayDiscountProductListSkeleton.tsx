import { DiscountProductItemSkeleton } from '@/components/products/DiscountProductItemSkeleton'
import { Fragment } from 'react'

const COUNT = 4

export function HomeTodayDiscountProductListSkeleton() {
  return (
    <div className="mb-10">
      {Array.from({ length: COUNT }).map((_, i) => (
        <Fragment key={i}>
          <DiscountProductItemSkeleton />
          {i < COUNT - 1 && (
            <div className="border-t border-[#eeeeee] my-[15px]" />
          )}
        </Fragment>
      ))}
    </div>
  )
}
