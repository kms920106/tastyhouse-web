import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function RecommendedKeywordListSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="w-20 h-9 rounded-full" />
      ))}
    </div>
  )
}
