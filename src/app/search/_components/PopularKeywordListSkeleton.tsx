import { Skeleton } from '@/components/ui/shadcn/skeleton'

export default function PopularKeywordListSkeleton() {
  return (
    <ul className="flex flex-col gap-5 px-[15px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className="flex items-center gap-5">
          <Skeleton className="w-5 h-4 shrink-0" />
          <Skeleton className="w-15 h-4" />
        </li>
      ))}
    </ul>
  )
}
