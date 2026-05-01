import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  id: number
  imageUrl: string
}

export default function MyReviewListItem({ id, imageUrl }: Props) {
  return (
    <Link key={id} href={PAGE_PATHS.REVIEW_DETAIL(id)} className="relative aspect-square">
      {imageUrl && (
        <Image src={imageUrl} alt="리뷰 이미지" fill sizes="33vw" className="object-cover" />
      )}
    </Link>
  )
}
