import ImageGallery from '@/app/places/[id]/(detail)/_components/ImageGallery'
import { formatDecimal, formatNumber } from '@/lib/number'

interface Props {
  name: string
  description: string
  imageUrls: string[]
  originalPrice: number
  discountPrice?: number | null
  discountRate?: number | null
}

export default function PlaceOrderMenuDetailInfo({
  name,
  description,
  imageUrls,
  originalPrice,
  discountPrice,
  discountRate,
}: Props) {
  return (
    <>
      <ImageGallery imageUrls={imageUrls} />
      <div className="px-[15px] py-[21px]">
        <h1 className="text-lg leading-[18px] font-bold">{name}</h1>
        <p className="mt-[13px] text-sm leading-relaxed">{description}</p>
        <div className="mt-[17px]">
          {discountRate == null ? (
            <p className="mt-[13px] text-base leading-[16px]">{formatNumber(originalPrice)}원</p>
          ) : (
            <div className="flex items-end leading-[21px]">
              <p className="text-base leading-[16px]">{formatNumber(discountPrice ?? 0)}원</p>
              <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                {formatNumber(originalPrice)}원
              </p>
              <p className="ml-[11px] text-sm leading-[14px] text-main">
                {formatDecimal(discountRate, 0)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
