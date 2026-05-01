import ImageContainer from '@/components/ui/ImageContainer'
import Rating from '@/components/ui/Rating'
import { Menu } from '@/domains/product'
import { formatDecimal, formatNumber } from '@/lib/number'
import Image from 'next/image'

interface Props {
  menu: Menu
}

export default function MenuItem({ menu }: Props) {
  return (
    <div className="flex items-center gap-[15px] py-[15px] pr-3">
      <ImageContainer src={menu.imageUrl} alt="메뉴 이미지" size={65} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {menu.spiciness && (
              <div className="flex gap-[3px] mb-[7px]">
                {Array.from({ length: menu.spiciness }).map((_, i) => (
                  <Image
                    src="/images/product/icon-spiciness.png"
                    alt="맵기"
                    width={9}
                    height={15}
                    key={i}
                  />
                ))}
              </div>
            )}
            <h4 className="mb-[9px] text-sm leading-[14px] truncate">{menu.name}</h4>
            {menu.discountRate == null ? (
              <p className="text-sm leading-[14px]">{formatNumber(menu.originalPrice)}원</p>
            ) : (
              <div className="flex items-end leading-[21px]">
                <p className="text-sm leading-[14px]">{formatNumber(menu.discountPrice)}원</p>
                <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                  {formatNumber(menu.originalPrice)}원
                </p>
                <p className="ml-[11px] text-sm leading-[14px] text-main">
                  {formatDecimal(menu.discountRate, 0)}%
                </p>
              </div>
            )}
          </div>
          {menu.rating && menu.reviewCount && (
            <div className="flex flex-col items-center gap-2.5">
              <Rating as="p" value={menu.rating} />
              <p className="text-xs leading-[12px] text-[#999999] tracking-tighter">
                리뷰 ({menu.reviewCount})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
