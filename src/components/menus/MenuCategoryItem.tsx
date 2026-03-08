import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/shadcn/skeleton'
import { MenuItemSkeleton } from './MenuItem'

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

interface MenuCategoryItemProps {
  categoryName: string
  children: React.ReactNode
  className?: string
}

export default function MenuCategoryItem({
  categoryName,
  children,
  className = '',
}: MenuCategoryItemProps) {
  return (
    <div className={cn('pt-[30px]', className)}>
      <h3 className="mb-[5px] text-base leading-[16px] font-bold">{categoryName}</h3>
      <div className="divide-y divide-[#eeeeee]">{children}</div>
    </div>
  )
}
