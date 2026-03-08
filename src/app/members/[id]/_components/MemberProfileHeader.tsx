'use client'

import Header, { HeaderLeft, HeaderRight } from '@/components/layouts/Header'
import { useRouter } from 'next/navigation'
import { IoChevronBack } from 'react-icons/io5'
import FollowButton from './FollowButton'

interface MemberProfileHeaderProps {
  memberId: number
}

export default function MemberProfileHeader({ memberId }: MemberProfileHeaderProps) {
  const router = useRouter()

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
          <FollowButton memberId={memberId} />
        </HeaderRight>
      </Header>
    </div>
  )
}
