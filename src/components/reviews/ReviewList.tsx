import EmptyState from '@/app/(with-footer)/(without-sidebar)/mypage/_components/EmptyState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { MyReviewListItemResponse } from '@/domains/member/member.type'
import { PAGE_PATHS } from '@/lib/paths'
import MyReviewListItem from './MyReviewListItem'

interface Props {
  reviews: MyReviewListItemResponse[]
  hasMoreReviews: boolean
}

export default function ReviewList({ reviews, hasMoreReviews }: Props) {
  if (reviews.length === 0) {
    return <EmptyState message="등록된 리뷰가 없습니다." />
  }

  return (
    <>
      <div className="py-[1px]">
        <div className="grid grid-cols-3 gap-[1.5px]">
          {reviews.map((review) => (
            <MyReviewListItem key={review.id} id={review.id} imageUrl={review.imageUrl} />
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
