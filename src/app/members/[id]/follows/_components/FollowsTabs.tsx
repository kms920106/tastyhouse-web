'use client'

import AppButton from '@/components/ui/AppButton'
import AppInputText from '@/components/ui/AppInputText'
import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { FollowMemberResponse } from '@/domains/follow'
import {
  followMember,
  getFollowerList,
  getFollowingList,
  removeFollower,
  unfollowMember,
} from '@/services/follow'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export type FollowTabValue = 'following' | 'follower'

interface FollowsTabsProps {
  memberId: number
  initialTab: FollowTabValue
}

const PAGE_SIZE = 20

const TAB_TRIGGER_CLASS =
  'flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

export default function FollowsTabs({ memberId, initialTab }: FollowsTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState('')

  const { data: followingList = [] } = useQuery({
    queryKey: ['following', memberId],
    queryFn: async () => {
      const response = await getFollowingList(memberId, { page: 0, size: PAGE_SIZE })
      return response.data ?? []
    },
  })

  const { data: followerList = [] } = useQuery({
    queryKey: ['followers', memberId],
    queryFn: async () => {
      const response = await getFollowerList(memberId, { page: 0, size: PAGE_SIZE })
      return response.data ?? []
    },
  })

  const followMutation = useMutation({
    mutationFn: (targetMemberId: number) => followMember(targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following', memberId] })
      queryClient.invalidateQueries({ queryKey: ['followers', memberId] })
    },
  })

  const unfollowMutation = useMutation({
    mutationFn: (targetMemberId: number) => unfollowMember(targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following', memberId] })
      queryClient.invalidateQueries({ queryKey: ['followers', memberId] })
    },
  })

  const removeFollowerMutation = useMutation({
    mutationFn: (targetMemberId: number) => removeFollower(targetMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followers', memberId] })
    },
  })

  const handleTabChange = useCallback(
    (tab: string) => {
      const params = new URLSearchParams()
      params.set('tab', tab)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      setSearchQuery('')
    },
    [router, pathname],
  )

  const handleFollowToggle = (member: FollowMemberResponse) => {
    if (member.isFollowing) {
      unfollowMutation.mutate(member.memberId)
    } else {
      followMutation.mutate(member.memberId)
    }
  }

  const handleRemoveFollower = (targetMemberId: number) => {
    removeFollowerMutation.mutate(targetMemberId)
  }

  const renderUserList = (list: FollowMemberResponse[], tab: FollowTabValue) => {
    const filtered = list.filter((user) =>
      user.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
      <div className="px-[15px] py-5">
        <div className="relative flex items-center">
          <AppInputText
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="!bg-[#fafafa] rounded-[2.5px] border-[#eeeeee] pr-[40px]"
          />
          <button className="absolute right-[17px] top-1/2 -translate-y-1/2">
            <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
          </button>
        </div>
        {filtered.map((member) => (
          <div
            key={member.memberId}
            className="flex items-center justify-between py-4 border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Avatar src={member.profileImageUrl} alt={member.nickname} />
              <div className="flex flex-col gap-[9px]">
                <MemberNickname>{member.nickname}</MemberNickname>
                <MemberGradeBadge grade={member.memberGrade} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {tab === 'follower' ? (
                <button
                  onClick={() => handleRemoveFollower(member.memberId)}
                  className="px-5 py-2 rounded-md text-[14px] font-medium bg-white border border-gray-300 text-gray-600"
                >
                  삭제
                </button>
              ) : (
                <AppButton
                  onClick={() => handleFollowToggle(member)}
                  className={`h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px] ${
                    member.isFollowing
                      ? 'bg-white text-main border border-main box-border'
                      : 'bg-main text-white'
                  }`}
                >
                  {member.isFollowing ? '팔로잉' : '팔로우'}
                </AppButton>
              )}
              <button className="w-8 h-8 flex items-center justify-center">
                <BsThreeDotsVertical size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-[35px] h-[40px]">
              <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
            </div>
            <div className="mt-[15px]">
              <p className="text-sm leading-[14px] text-[#aaaaaa]">
                {searchQuery
                  ? '검색 결과가 없습니다.'
                  : `${tab === 'following' ? '팔로잉' : '팔로워'}이 없습니다.`}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0">
      <TabsList className="w-full h-[50px] rounded-none bg-white p-0">
        <TabsTrigger value="following" className={TAB_TRIGGER_CLASS}>
          팔로잉
        </TabsTrigger>
        <TabsTrigger value="follower" className={TAB_TRIGGER_CLASS}>
          팔로워
        </TabsTrigger>
      </TabsList>
      <TabsContent value="following" className="mt-0">
        {renderUserList(followingList, 'following')}
      </TabsContent>
      <TabsContent value="follower" className="mt-0">
        {renderUserList(followerList, 'follower')}
      </TabsContent>
    </Tabs>
  )
}
