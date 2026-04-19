'use client'

import ImageContainer from '@/components/ui/ImageContainer'
import Rating from '@/components/ui/Rating'
import usePlaceBookmark from '@/hooks/usePlaceBookmark'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface BookmarkListItemProps {
  placeId: number
  placeImage: string
  region: string
  placeName: string
  rating: number
  isBookmarked: boolean
}

export default function BookmarkListItem({
  placeId,
  placeImage,
  region,
  placeName,
  rating,
  isBookmarked: initialIsBookmarked,
}: BookmarkListItemProps) {
  const { isBookmarked, isPending, toggleBookmark } = usePlaceBookmark({
    placeId,
    initialIsBookmarked,
  })

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleBookmark()
  }

  return (
    <Link href={PAGE_PATHS.PLACE_DETAIL(placeId)} className="block">
      <div className="relative p-2.5 bg-white border border-[#eeeeee] box-border shadow-2xs rounded-[2.5px]">
        <div className="flex items-center gap-4">
          <ImageContainer src={placeImage} alt={placeName} size={75} rounded="2.5px" />
          <div className="flex-1 flex flex-col justify-between py-1">
            <p className="text-xs leading-[12px] text-[#aaaaaa] truncate">{region}</p>
            <p className="text-lg leading-[18px] mt-2 truncate">{placeName}</p>
            <Rating value={rating} className="mt-[15px]" />
          </div>
        </div>
        <button
          type="button"
          onClick={handleBookmarkClick}
          className="absolute"
          style={{
            right: '15px',
            top: '-3px',
          }}
          disabled={isPending}
        >
          {isBookmarked ? (
            <Image src="/images/mypage/icon-bookmark-on.png" alt="찜" width={16} height={24} />
          ) : (
            <Image src="/images/mypage/icon-bookmark-off.png" alt="찜" width={16} height={24} />
          )}
        </button>
      </div>
    </Link>
  )
}
