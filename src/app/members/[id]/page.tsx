'use client'

import MyPageReviewItem from '@/components/mypage/MyPageReviewItem'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'

// �� T� pt0
const getMemberData = (id: string) => ({
  id,
  userName: '테스트',
  userProfileImage: null,
  memberBadge: '테스트',
  description: '테스트.',
  reviewCount: 7,
  followingCount: 0,
  followerCount: 0,
  isFollowing: false,
})

const getDummyReviews = () => [
  {
    id: 1,
    userName: '테스트',
    userProfileImage: null,
    reviewCount: 7,
    images: Array(7).fill('/images/sample/food-image1.png'),
  },
]

export default function MemberProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(false)

  const memberData = getMemberData(params.id)
  const reviews = getDummyReviews()

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
    // TODO: API 8�
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative h-[200px] bg-main">
        <div className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10"
          >
            <IoChevronBack size={28} className="text-white" />
          </button>
          <button
            onClick={handleFollowToggle}
            className="flex items-center justify-center w-10 h-10"
          >
            <div className="relative w-8 h-8">
              <Image
                src="/images/icon-user.png"
                alt="���"
                width={32}
                height={32}
                className="filter brightness-0 invert"
              />
              <span className="absolute -top-1 -right-1 text-white text-[20px] font-bold leading-none">
                {isFollowing ? '-' : '+'}
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Profile */}
      <div className="bg-white -mt-[100px] relative z-10 px-4">
        <div className="flex flex-col items-center">
          {/* \D t�� */}
          <div className="relative w-[120px] h-[120px] rounded-full bg-white border-4 border-white overflow-hidden mb-4">
            {memberData.userProfileImage ? (
              <Image
                src={memberData.userProfileImage}
                alt={memberData.userName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="w-16 h-16 rounded-full bg-white" />
              </div>
            )}
          </div>

          {/* �$� */}
          <h1 className="text-[20px] font-bold mb-2">{memberData.userName}</h1>

          {/* d� C� */}
          <div className="flex items-center gap-1 mb-3">
            <Image src="/images/icon-member-badge.png" alt="d� C�" width={20} height={20} />
            <span className="text-sm leading-[14px] text-[#FFA500]">{memberData.memberBadge}</span>
          </div>

          {/* $� */}
          {memberData.description && (
            <p className="text-sm leading-[14px] text-gray-600 text-center mb-6">
              {memberData.description}
            </p>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-12 py-6 bg-white border-b-[8px] border-gray-100">
        <div className="flex flex-col items-center gap-1">
          <span className="text-base">��</span>
          <span className="text-[20px] font-bold">{memberData.reviewCount}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-base">테스트</span>
          <span className="text-[20px] font-bold">{memberData.followingCount}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-base">테스트</span>
          <span className="text-[20px] font-bold">
            {isFollowing ? memberData.followerCount + 1 : memberData.followerCount}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 flex bg-white border-b border-gray-200">
        <button className="flex-1 h-[60px] flex items-center justify-center relative">
          <Image src="/images/icon-mypage-review.png" alt="��" width={32} height={32} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-main" />
        </button>
        <button className="flex-1 h-[60px] flex items-center justify-center opacity-40">
          <Image src="/images/icon-mypage-place.png" alt="테스트" width={32} height={32} />
        </button>
      </div>

      {/* Reviews Content */}
      <div className="pb-[70px]">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <MyPageReviewItem
              key={review.id}
              userProfileImage={review.userProfileImage}
              userName={review.userName}
              reviewCount={review.reviewCount}
              images={review.images}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 mb-4">
              <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
              </svg>
            </div>
            <p className="text-gray-400 text-[15px]">�]테스트</p>
          </div>
        )}
      </div>
    </div>
  )
}
