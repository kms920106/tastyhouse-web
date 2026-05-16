import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function RecommendedKeywordListSkeleton() {
  return (
    <div className="px-[15px] py-[18px]">
      <Skeleton className="w-24 h-5 mb-4" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-9 rounded-full" />
        ))}
      </div>
    </div>
  )
}
