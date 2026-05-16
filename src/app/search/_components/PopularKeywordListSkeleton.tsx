import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function PopularKeywordListSkeleton() {
  return (
    <div className="px-[15px] py-[18px]">
      <Skeleton className="w-24 h-5 mb-4" />
      <ul className="flex flex-col gap-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className="flex items-center gap-4">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="w-24 h-5" />
          </li>
        ))}
      </ul>
    </div>
  )
}
