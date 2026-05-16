import ImageContainer from '@/components/ui/ImageContainer'
import Rating from '@/components/ui/Rating'
import type { SearchMenuItem } from '@/domains/search/search.model'
import { formatDecimal, formatNumber } from '@/lib/number'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  item: SearchMenuItem
}

export default function SearchResultMenuListItem({ item }: Props) {
  const {
    id,
    name,
    imageUrl,
    originalPrice,
    discountPrice,
    discountRate,
    rating,
    reviewCount,
    spiciness,
  } = item

  return (
    <li className="border-b border-[#eeeeee] last:border-b-0">
      <Link
        href={PAGE_PATHS.PRODUCT_DETAIL(id)}
        className="flex items-center gap-[15px] py-[15px] px-[15px]"
      >
        <ImageContainer src={imageUrl} alt={name} size={65} rounded="1px" />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0 flex-1">
              {!!spiciness && (
                <div className="flex gap-[3px] mb-[7px]">
                  {Array.from({ length: spiciness }).map((_, i) => (
                    <Image
                      key={i}
                      src="/images/product/icon-spiciness.png"
                      alt="맵기"
                      width={9}
                      height={15}
                    />
                  ))}
                </div>
              )}
              <h4 className="mb-[9px] text-sm leading-[14px] truncate">{name}</h4>
              {discountRate == null || discountRate === 0 ? (
                <p className="text-sm leading-[14px]">{formatNumber(originalPrice)}원</p>
              ) : (
                <div className="flex items-end leading-[21px]">
                  <p className="text-sm leading-[14px]">{formatNumber(discountPrice)}원</p>
                  <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                    {formatNumber(originalPrice)}원
                  </p>
                  <p className="ml-[11px] text-sm leading-[14px] text-main">
                    {formatDecimal(discountRate, 0)}%
                  </p>
                </div>
              )}
            </div>
            {!!rating && !!reviewCount && (
              <div className="flex flex-col items-center gap-2.5 ml-2 shrink-0">
                <Rating as="p" value={rating} />
                <p className="text-xs leading-[12px] text-[#999999] tracking-tighter">
                  리뷰 ({reviewCount})
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  )
}
