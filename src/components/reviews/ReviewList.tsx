import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { MyReviewListItemResponse } from '@/domains/member/member.type'
import { resolveImageUrl } from '@/lib/image'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface ReviewListItemProps {
  id: number
  imageUrl: string
}

function ReviewListItem({ id, imageUrl }: ReviewListItemProps) {
  return (
    <Link key={id} href={PAGE_PATHS.REVIEW_DETAIL(id)} className="relative aspect-square">
      <Image
        src={resolveImageUrl(imageUrl ?? '')}
        alt="리뷰 이미지"
        fill
        sizes="33vw"
        className="object-cover"
      />
    </Link>
  )
}

interface ReviewListProps {
  reviews: MyReviewListItemResponse[]
  hasMoreReviews: boolean
}

export default function ReviewList({ reviews, hasMoreReviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">등록된 리뷰가 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="py-[1px]">
        <div className="grid grid-cols-3 gap-[1.5px]">
          {reviews.map((review) => (
            <ReviewListItem key={review.id} id={review.id} imageUrl={review.imageUrl} />
          ))}
        </div>
        {hasMoreReviews && (
          <div className="flex justify-center py-5">
            <ViewMoreButton href={PAGE_PATHS.MY_REVIEWS} label="더 보러가기" />
          </div>
        )}
      </div>
      <div className="h-[70px]"></div>
    </>
  )
}
