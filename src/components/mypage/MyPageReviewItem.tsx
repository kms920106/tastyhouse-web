'use client'

import Image from 'next/image'
import { IoPersonAddOutline } from 'react-icons/io5'

interface Props {
  userProfileImage: string | null
  userName: string
  reviewCount: number
  images: string[]
}

export default function MyPageReviewItem({
  userProfileImage,
  userName,
  reviewCount,
  images,
}: Props) {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="px-4 flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            {userProfileImage ? (
              <Image src={userProfileImage} alt={userName} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="w-6 h-6 rounded-full bg-white" />
              </div>
            )}
          </div>
          <div>
            <p className="text-[15px] font-bold">{userName}</p>
            <p className="text-[13px] text-gray-500">리뷰 {reviewCount}개</p>
          </div>
        </div>
        <button className="flex items-center justify-center w-8 h-8 rounded-full">
          <IoPersonAddOutline size={24} className="text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-[1.5px]">
        {images.slice(0, 7).map((image, index) => (
          <div key={index} className="relative aspect-square bg-gray-100">
            <Image src={image} alt={`리뷰 이미지 ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}
