import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function SearchMenuListItemSkeleton() {
  return (
    <li className="flex items-center gap-[15px] py-[15px] px-[15px] border-b border-[#eeeeee] last:border-b-0">
      <Skeleton className="w-[65px] h-[65px] shrink-0 rounded-[1px]" />
      <div className="flex-1 flex flex-col gap-[9px]">
        <Skeleton className="h-[14px] w-3/5" />
        <Skeleton className="h-[14px] w-2/5" />
      </div>
      <div className="flex flex-col items-center gap-2.5">
        <Skeleton className="h-[19px] w-[30px]" />
        <Skeleton className="h-[12px] w-[50px]" />
      </div>
    </li>
  )
}

export function SearchMenuListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul>
      {Array.from({ length: count }).map((_, i) => (
        <SearchMenuListItemSkeleton key={i} />
      ))}
    </ul>
  )
}
