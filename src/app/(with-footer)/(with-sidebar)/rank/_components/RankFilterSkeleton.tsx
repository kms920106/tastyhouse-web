import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function RankFilterSkeleton() {
  return (
    <>
      <div className="flex gap-2.5">
        <div className="flex gap-3 p-0 bg-white">
          <Skeleton className="w-10 h-[18px]" />
          <Skeleton className="w-10 h-[18px]" />
        </div>
        <Skeleton className="w-[15px] h-[15px]" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-40 h-3.5 ml-auto" />
        <Skeleton className="w-30 h-3.5 ml-auto" />
      </div>
    </>
  )
}
