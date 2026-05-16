import type { SearchReviewItem } from '@/domains/search/search.model'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  item: SearchReviewItem
}

export default function SearchResultReviewGridItem({ item }: Props) {
  const { reviewId, imageUrl, placeId } = item

  return (
    <Link
      href={PAGE_PATHS.PLACE_DETAIL(placeId)}
      className="block relative aspect-square overflow-hidden bg-[#eeeeee]"
      aria-label={`리뷰 ${reviewId}`}
    >
      <Image src={imageUrl} alt="리뷰 이미지" fill sizes="33vw" className="object-cover" />
    </Link>
  )
}
