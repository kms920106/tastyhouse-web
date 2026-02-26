import ReviewAuthorInfo from '@/components/reviews/ReviewAuthorInfo'
import ReviewDetailHeader from '@/components/reviews/ReviewDetailHeader'
import ReviewImageGallery from '@/components/reviews/ReviewImageGallery'
import ReviewRatingDetail from '@/components/reviews/ReviewRatingDetail'
import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import Rating from '@/components/ui/Rating'
import SectionStack from '@/components/ui/SectionStack'
import TextContent from '@/components/ui/TextContent'
import { reviewService } from '@/domains/review'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import ReviewTagList from '../../_components/ReviewTagList'

interface ReviewProductSectionProps {
  reviewId: number
}

export default async function ReviewProductSection({ reviewId }: ReviewProductSectionProps) {
  // API 호출
  const { error, data } = await reviewService.getReviewProductDetail(reviewId)

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
  }

  const {
    productId,
    productName,
    productImageUrl,
    productPrice,
    content,
    totalRating,
    tasteRating,
    amountRating,
    priceRating,
    atmosphereRating,
    kindnessRating,
    hygieneRating,
    willRevisit,
    memberNickname,
    memberProfileImageUrl,
    createdAt,
    imageUrls,
    tagNames,
  } = data.data

  return (
    <section>
      <ReviewDetailHeader memberNickname={memberNickname} />
      <SectionStack>
        {productId && (
          <>
            <BorderedSection className="border-t-0 px-[15px] py-5">
              <div className="flex items-center gap-4">
                <div className="relative w-[50px] h-[50px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={productImageUrl}
                    alt={productName}
                    fill
                    className="object-cover"
                    sizes="50px"
                  />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <h3 className="text-sm leading-[14px] truncate">{productName}</h3>
                  <span className="mt-2.5 text-sm leading-[14px]">
                    {formatNumber(productPrice)}원
                  </span>
                </div>
              </div>
            </BorderedSection>
          </>
        )}
        <BorderedSection className="px-[15px] border-b-0">
          <div className="py-5 border-b border-[#eeeeee] box-border">
            <ReviewRatingDetail
              averageAtmosphereRating={atmosphereRating}
              averageKindnessRating={kindnessRating}
              averageTasteRating={tasteRating}
              averageAmountRating={amountRating}
              averageHygieneRating={hygieneRating}
              averagePriceRating={priceRating}
              willRevisitPercentage={willRevisit ? 100 : 0}
            />
          </div>
          <div className="py-5">
            <div className="flex justify-between">
              <ReviewAuthorInfo
                profileImageUrl={memberProfileImageUrl}
                nickname={memberNickname}
                createdAt={createdAt}
              />
              <Rating as="p" value={totalRating} />
            </div>
            {productId && (
              <div className="mt-[25px]">
                <Link
                  href={PAGE_PATHS.PRODUCT_DETAIL(productId)}
                  className="block text-sm leading-[14px] text-[#999999]"
                >
                  [선택] {productName}
                </Link>
              </div>
            )}
            <div className="mt-[15px]">
              <TextContent text={content} />
            </div>
            <div className="mt-5">
              <ReviewImageGallery imageUrls={imageUrls} />
            </div>
            <div className="mt-5">
              <ReviewTagList tagNames={tagNames} />
            </div>
          </div>
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
