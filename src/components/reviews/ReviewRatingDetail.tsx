import { formatDecimal } from '@/lib/number'
import RatingStar from '../ui/RatingStar'
import { Skeleton } from '../ui/shadcn/skeleton'

export function ReviewRatingDetailSkeleton() {
  return (
    <div className="flex flex-row justify-between">
      <div className="space-y-2.5">
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <Skeleton className="w-18 h-3" />
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-5 w-full">
            <Skeleton className="w-14 h-3" />
            <div className="flex-1 flex items-center gap-[7px]">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-[14px] h-[14px]" />
                ))}
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ReviewRatingDetailItemProps {
  label: string
  rating: number
}

function ReviewRatingDetailItem({ label, rating }: ReviewRatingDetailItemProps) {
  return (
    <div className="flex-1 flex items-center">
      <div className="flex items-center w-full">
        <span className="w-20 text-xs leading-[12px] text-[#666666]">{label}</span>
        <div className="flex-1 flex items-center gap-[7px]">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => {
              return <RatingStar key={star} starIndex={star} rating={rating} />
            })}
          </div>
          <span className="text-xs leading-[12px] text-main">{formatDecimal(rating, 1)}</span>
        </div>
      </div>
    </div>
  )
}

interface Props {
  averageAtmosphereRating: number
  averageKindnessRating: number
  averageTasteRating: number
  averageAmountRating: number
  averageHygieneRating: number
  averagePriceRating: number
  willRevisitPercentage: number
}

export default function ReviewRatingDetail({
  averageAtmosphereRating,
  averageKindnessRating,
  averageTasteRating,
  averageAmountRating,
  averageHygieneRating,
  averagePriceRating,
  willRevisitPercentage,
}: Props) {
  return (
    <div className="flex flex-row justify-between">
      <div className="space-y-2.5">
        <ReviewRatingDetailItem label="분위기" rating={averageAtmosphereRating} />
        <ReviewRatingDetailItem label="양" rating={averageAmountRating} />
        <ReviewRatingDetailItem label="위생" rating={averageHygieneRating} />
        <div className="flex-1 flex items-center">
          <div className="flex items-center w-full">
            <span className="w-20 text-xs leading-[12px] text-[#666666]">재방문의사</span>
            <span className="flex-1 flex items-center text-xs leading-[12px] text-main">
              있어요 ({formatDecimal(willRevisitPercentage, 0)}%)
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <ReviewRatingDetailItem label="친절" rating={averageKindnessRating} />
        <ReviewRatingDetailItem label="맛" rating={averageTasteRating} />
        <ReviewRatingDetailItem label="가격" rating={averagePriceRating} />
      </div>
    </div>
  )
}
