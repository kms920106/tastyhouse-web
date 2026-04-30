import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function BannerSwiperSkeleton() {
  return (
    <div className="w-full aspect-[375/475]">
      <Skeleton className="w-full h-full rounded-none" />
    </div>
  )
}
