import { DiscountProductItemSkeleton } from '@/components/products/DiscountProductItemSkeleton'
import { Skeleton } from '@/components/ui/shadcn/skeleton'

interface Props {
  viewType: 'list' | 'grid'
  count?: number
}

export default function TodayDiscountListSkeleton({ viewType, count = 6 }: Props) {
  if (viewType === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-x-2.5 gap-y-5 px-[15px] py-[15px]">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full aspect-square" />
            <div className="pt-2.5">
              <Skeleton className="h-3 w-16 mb-1.5" />
              <Skeleton className="h-3.5 w-28 mb-2" />
              <div className="flex items-baseline gap-1.5">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="divide-y divide-[#eeeeee] px-[15px]">
      {Array.from({ length: count }).map((_, i) => (
        <DiscountProductItemSkeleton key={i} />
      ))}
    </div>
  )
}
