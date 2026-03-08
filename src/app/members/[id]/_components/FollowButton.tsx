'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { useFollowMutation } from '@/hooks/useFollowMutation'
import { useOtherMemberProfile } from '@/hooks/useOtherMemberProfile'
import { IoPersonAdd, IoPersonRemove } from 'react-icons/io5'

interface FollowButtonProps {
  memberId: number
}

export default function FollowButton({ memberId }: FollowButtonProps) {
  const { handleFollowToggle } = useFollowMutation()

  const { data, isLoading } = useOtherMemberProfile(memberId)
  const { following = false } = data ?? {}

  if (isLoading) {
    return <Skeleton className="w-10 h-10 rounded-full" />
  }

  return (
    <button
      onClick={() => handleFollowToggle({ memberId, following })}
      className="flex items-center justify-center w-10 h-10 cursor-pointer"
    >
      {following ? (
        <IoPersonRemove size={24} className="text-white" />
      ) : (
        <IoPersonAdd size={24} className="text-white" />
      )}
    </button>
  )
}
