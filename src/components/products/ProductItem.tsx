import ImageContainer from '@/components/ui/ImageContainer'
import { formatDecimal, formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  id: number
  imageUrl: string
  name: string
  placeName: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

export default function ProductItem({
  id,
  imageUrl,
  name,
  placeName,
  originalPrice,
  discountPrice,
  discountRate,
}: Props) {
  return (
    <Link href={PAGE_PATHS.PRODUCT_DETAIL(id)} className="block">
      <div className="flex items-center gap-4 py-[15px]">
        <ImageContainer src={imageUrl} alt={name} size={75} />
        <div className="flex-1 flex flex-col min-w-0">
          <p className="mb-2.5 text-xs leading-[12px] truncate">{placeName}</p>
          <h3 className="mb-[17px] text-base leading-[16px] truncate">{name}</h3>
          <div className="flex justify-between">
            {discountRate === null ? (
              <span className="text-base leading-[16px]">{formatNumber(originalPrice)}원</span>
            ) : (
              <>
                <div className="flex items-end gap-2">
                  <span className="text-base leading-[16px]">{formatNumber(discountPrice)}원</span>
                  <span className="text-xs leading-[12px] text-[#aaaaaa] line-through">
                    {formatNumber(originalPrice)}원
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base leading-[16px] text-main">
                    {formatDecimal(discountRate, 0)}%
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
