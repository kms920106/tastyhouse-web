import ImageContainer from '@/components/ui/ImageContainer'
import type { SearchPlaceItem } from '@/domains/search/search.model'
import { PAGE_PATHS } from '@/lib/paths'
import { formatDecimal } from '@/lib/number'
import Link from 'next/link'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

interface Props {
  item: SearchPlaceItem
}

export default function SearchPlaceListItem({ item }: Props) {
  const { id, name, stationName, rating, imageUrl, isBookmarked } = item

  return (
    <li>
      <Link
        href={PAGE_PATHS.PLACE_DETAIL(id)}
        className="flex items-center gap-[15px] px-[15px] py-[20px] bg-white border border-[#eeeeee] rounded-[2.5px]"
      >
        <div className="flex-1 flex flex-col gap-[9px] min-w-0">
          <h3 className="text-[18px] leading-[18px] text-[#333333] truncate">{name}</h3>
          <p className="text-xs leading-[12px] text-[#aaaaaa]">{stationName}</p>
          <p className="text-[19px] leading-[19px] text-main">{formatDecimal(rating, 1)}</p>
        </div>
        <div className="flex items-center gap-[10px] shrink-0">
          {isBookmarked !== null && (
            <span className="text-main">
              {isBookmarked ? (
                <FaBookmark size={16} className="text-main" />
              ) : (
                <FaRegBookmark size={16} className="text-[#eeeeee]" />
              )}
            </span>
          )}
          <ImageContainer src={imageUrl} alt={name} size={75} rounded="2.5px" />
        </div>
      </Link>
    </li>
  )
}
