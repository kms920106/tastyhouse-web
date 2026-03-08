'use client'

import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { useFollowMutation } from '@/hooks/useFollowMutation'
import { useRouter } from 'next/navigation'
import { IoChevronBack, IoPersonAdd, IoPersonRemove } from 'react-icons/io5'

interface MemberProfileHeaderProps {
  memberId: number
  isFollowing: boolean
}

export default function MemberProfileHeader({ memberId, isFollowing }: MemberProfileHeaderProps) {
  const router = useRouter()
  const { handleFollowToggle } = useFollowMutation()

  return (
    <div className="flex-1 bg-main">
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-[55px] h-[55px]"
          >
            <IoChevronBack size={24} className="text-white" />
          </button>
        </HeaderLeft>
        <HeaderRight>
          <button
            onClick={() => handleFollowToggle({ memberId, following: isFollowing })}
            className="flex items-center justify-center w-10 h-10"
          >
            {isFollowing ? (
              <IoPersonRemove size={24} className="text-white" />
            ) : (
              <IoPersonAdd size={24} className="text-white" />
            )}
          </button>
        </HeaderRight>
      </Header>
    </div>
  )
}
