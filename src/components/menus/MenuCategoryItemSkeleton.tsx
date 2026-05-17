import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { MenuItemSkeleton } from './MenuItemSkeleton'

export function MenuCategoryItemSkeleton() {
  return (
    <div className="pt-[30px] pb-[15px] border-b border-[#eeeeee] box-border">
      <Skeleton className="w-20 h-[16px] mb-5" />
      <div>
        <MenuItemSkeleton />
        <div className="border-t border-[#eeeeee] my-[15px]" />
        <MenuItemSkeleton />
        <div className="border-t border-[#eeeeee] my-[15px]" />
        <MenuItemSkeleton />
      </div>
    </div>
  )
}
