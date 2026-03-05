'use client'

import AppButton from '@/components/ui/AppButton'
import AppInputText from '@/components/ui/AppInputText'
import Avatar from '@/components/ui/Avatar'
import MemberGradeBadge from '@/components/ui/MemberGradeBadge'
import MemberNickname from '@/components/ui/MemberNickname'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export type FollowTabValue = 'following' | 'follower'

interface FollowUser {
  id: number
  nickname: string
  profileImageUrl: string | null
  grade: MemberGradeCode
  isFollowing: boolean
}

// TODO: API 구현 시 아래 더미 데이터를 실제 API 호출로 교체
const getDummyFollowers = (): FollowUser[] => [
  {
    id: 1,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
  {
    id: 2,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: false,
  },
  {
    id: 3,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
  {
    id: 4,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
]

const getDummyFollowing = (): FollowUser[] => [
  {
    id: 1,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: false,
  },
  {
    id: 2,
    nickname: '먹는게제일좋아02',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: false,
  },
  {
    id: 3,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
  {
    id: 4,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
  {
    id: 5,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    grade: 'TEHA',
    isFollowing: true,
  },
]

// TODO: API 구현 시 실제 팔로우/언팔로우 API 호출로 교체
// async function followMember(memberId: number): Promise<void> { ... }
// async function unfollowMember(memberId: number): Promise<void> { ... }

// TODO: API 구현 시 팔로워 삭제 API 호출로 교체
// async function removeFollower(memberId: number): Promise<void> { ... }

interface FollowsTabsProps {
  memberId: number
  initialTab: FollowTabValue
}

export default function FollowsTabs({ memberId, initialTab }: FollowsTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [searchQuery, setSearchQuery] = useState('')
  const [followStates, setFollowStates] = useState<Record<number, boolean>>({})

  // TODO: API 구현 시 useQuery로 교체
  // const { data: followingList } = useQuery({ queryKey: ['following', memberId], queryFn: () => getFollowing(memberId) })
  // const { data: followerList } = useQuery({ queryKey: ['followers', memberId], queryFn: () => getFollowers(memberId) })
  const followingList = getDummyFollowing()
  const followerList = getDummyFollowers()

  const handleTabChange = useCallback(
    (tab: string) => {
      const params = new URLSearchParams()
      params.set('tab', tab)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      setSearchQuery('')
    },
    [router, pathname],
  )

  const getFollowState = (userId: number, defaultState: boolean) =>
    followStates[userId] !== undefined ? followStates[userId] : defaultState

  const handleFollowToggle = (userId: number, currentState: boolean) => {
    setFollowStates((prev) => ({
      ...prev,
      [userId]: prev[userId] !== undefined ? !prev[userId] : !currentState,
    }))
    // TODO: API 구현 시 팔로우/언팔로우 API 호출
    // if (currentState) { await unfollowMember(userId) } else { await followMember(userId) }
  }

  const handleRemoveFollower = (userId: number) => {
    // TODO: API 구현 시 팔로워 삭제 API 호출
    // await removeFollower(userId)
    console.log('팔로워 삭제:', userId)
  }

  const TAB_TRIGGER_CLASS =
    'flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

  const renderUserList = (list: FollowUser[], tab: FollowTabValue) => {
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
        <div className="">
          {filtered.map((member) => {
            const isFollowing = getFollowState(member.id, member.isFollowing)
            return (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Avatar src={member.profileImageUrl} alt={member.nickname} />
                  <div className="flex flex-col gap-[9px]">
                    <MemberNickname>{member.nickname}</MemberNickname>
                    <MemberGradeBadge grade={member.grade} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {tab === 'follower' ? (
                    <button
                      onClick={() => handleRemoveFollower(member.id)}
                      className="px-5 py-2 rounded-md text-[14px] font-medium bg-white border border-gray-300 text-gray-600"
                    >
                      삭제
                    </button>
                  ) : (
                    <AppButton
                      onClick={() => handleFollowToggle(member.id, member.isFollowing)}
                      className={`h-[31px] px-[23px] py-2.5 text-xs leading-[12px] rounded-[2.5px] ${
                        isFollowing
                          ? 'bg-white text-main border border-main box-border'
                          : 'bg-main text-white'
                      }`}
                    >
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </AppButton>
                  )}
                  <button className="w-8 h-8 flex items-center justify-center">
                    <BsThreeDotsVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 mb-4">
              <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                <circle cx="35" cy="30" r="15" />
                <path d="M10 70 Q10 50 35 50 Q60 50 60 70 Z" />
                <circle cx="70" cy="35" r="12" />
                <path d="M55 80 Q55 65 70 65 Q85 65 85 80 Z" />
              </svg>
            </div>
            <p className="text-gray-400 text-[15px]">
              {searchQuery
                ? '검색 결과가 없습니다.'
                : `${tab === 'following' ? '팔로잉' : '팔로워'}이 없습니다.`}
            </p>
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
