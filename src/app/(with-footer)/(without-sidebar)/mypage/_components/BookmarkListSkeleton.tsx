import { Skeleton } from '@/components/ui/shadcn/skeleton'

function BookmarkListItemSkeleton() {
  return (
    <div className="relative p-2.5 bg-white border border-[#eeeeee] box-border shadow-2xs rounded-[2.5px]">
      <div className="flex items-center gap-4">
        <Skeleton className="w-[75px] h-[75px] rounded-[2.5px]" />
        <div className="flex-1 flex flex-col justify-between py-1">
          <Skeleton className="h-[12px] w-16" />
          <Skeleton className="h-[18px] w-28 mt-2" />
          <Skeleton className="h-[19px] w-10 mt-[15px]" />
        </div>
      </div>
    </div>
  )
}

export function BookmarkListSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 px-[15px] py-[20px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <BookmarkListItemSkeleton key={index} />
      ))}
    </div>
  )
}
