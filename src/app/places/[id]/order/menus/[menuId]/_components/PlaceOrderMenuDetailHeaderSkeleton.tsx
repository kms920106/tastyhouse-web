import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { Skeleton } from '@/components/ui/shadcn/skeleton'

export function PlaceOrderMenuDetailHeaderSkeleton() {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
      </HeaderLeft>
      <HeaderRight>
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
        <Skeleton className="h-[18px] w-[18px] rounded-full" />
      </HeaderRight>
    </Header>
  )
}
