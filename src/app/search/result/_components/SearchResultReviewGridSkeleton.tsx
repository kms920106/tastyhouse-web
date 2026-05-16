import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function SearchResultReviewGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-none" />
      ))}
    </div>
  )
}
