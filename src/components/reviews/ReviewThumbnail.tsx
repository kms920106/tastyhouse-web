import Image from 'next/image'

interface Props {
  imageUrl: string
}

export default function ReviewThumbnail({ imageUrl }: Props) {
  return (
    <div className="relative aspect-square overflow-hidden bg-[#eeeeee]">
      <Image src={imageUrl} alt="리뷰 이미지" fill sizes="33vw" className="object-cover" />
    </div>
  )
}
