import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function SearchPlaceListItemSkeleton() {
  return (
    <li className="flex items-center gap-[15px] px-[15px] py-[20px] bg-white border border-[#eeeeee] rounded-[2.5px]">
      <div className="flex-1 flex flex-col gap-[9px]">
        <Skeleton className="h-[18px] w-3/4" />
        <Skeleton className="h-[12px] w-1/3" />
        <Skeleton className="h-[19px] w-[40px]" />
      </div>
      <Skeleton className="w-[75px] h-[75px] rounded-[2.5px] shrink-0" />
    </li>
  )
}

export function SearchPlaceListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="flex flex-col gap-[10px]">
      {Array.from({ length: count }).map((_, i) => (
        <SearchPlaceListItemSkeleton key={i} />
      ))}
    </ul>
  )
}
