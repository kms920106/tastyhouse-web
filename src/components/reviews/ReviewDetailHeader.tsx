import { Skeleton } from '@/components/ui/shadcn/skeleton'
import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '../layouts/Header'
import { BackButton } from '../layouts/header-parts'

export function ReviewDetailHeaderSkeleton() {
  return <Skeleton className="h-[17px] w-[120px]" />
}

interface ReviewDetailHeaderProps {
  memberNickname?: string
}

export default function ReviewDetailHeader({ memberNickname }: ReviewDetailHeaderProps) {
  return (
    <Header variant="white" height={55}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        {memberNickname ? (
          <HeaderTitle>
            <span className="font-bold">{memberNickname}</span>
            님의 리뷰
          </HeaderTitle>
        ) : (
          <p>-</p>
        )}
      </HeaderCenter>
    </Header>
  )
}
