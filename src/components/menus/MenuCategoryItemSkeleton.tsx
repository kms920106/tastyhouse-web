import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MenuItemSkeleton } from './MenuItemSkeleton'

export function MenuCategoryItemSkeleton() {
  return (
    <div className="pt-[30px] border-b border-[#eeeeee] box-border">
      <Skeleton className="w-20 h-[16px] mb-[5px]" />
      <div className="divide-y divide-[#eeeeee]">
        <MenuItemSkeleton />
        <MenuItemSkeleton />
        <MenuItemSkeleton />
      </div>
    </div>
  )
}
