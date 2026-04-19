import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { MyBookmarkedPlaceListItemResponse } from '@/domains/member/member.type'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import BookmarkListItem from './BookmarkListItem'

interface BookmarkListProps {
  bookmarks: MyBookmarkedPlaceListItemResponse[]
  hasMoreBookmarks: boolean
}

export default function BookmarkList({ bookmarks, hasMoreBookmarks }: BookmarkListProps) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">저장된 즐겨찾기가 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2.5 px-[15px] py-[20px]">
        {bookmarks.map((bookmark) => (
          <BookmarkListItem
            key={bookmark.placeId}
            placeId={bookmark.placeId}
            placeImage={bookmark.imageUrl}
            region={bookmark.stationName}
            placeName={bookmark.placeName}
            rating={bookmark.rating}
            isBookmarked={bookmark.isBookmarked}
          />
        ))}
      </div>
      {hasMoreBookmarks && (
        <div className="flex justify-center py-5">
          <ViewMoreButton href={PAGE_PATHS.MY_BOOKMARKS} label="더 보러가기" />
        </div>
      )}
      <div className="h-[70px]"></div>
    </>
  )
}
