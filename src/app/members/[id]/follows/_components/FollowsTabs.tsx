'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoClose, IoSearch } from 'react-icons/io5'

export type FollowTabValue = 'following' | 'follower'

interface FollowUser {
  id: number
  nickname: string
  profileImageUrl: string | null
  gradeName: string
  isFollowing: boolean
}

// TODO: API 구현 시 아래 더미 데이터를 실제 API 호출로 교체
const getDummyFollowers = (): FollowUser[] => [
  {
    id: 1,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: true,
  },
  {
    id: 2,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: false,
  },
  {
    id: 3,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: true,
  },
  {
    id: 4,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: true,
  },
]

const getDummyFollowing = (): FollowUser[] => [
  {
    id: 1,
    nickname: '먹는게제일좋아',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: false,
  },
  {
    id: 2,
    nickname: '먹는게제일좋아02',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: false,
  },
  {
    id: 3,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: true,
  },
  {
    id: 4,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    gradeName: '테하멤버',
    isFollowing: true,
  },
  {
    id: 5,
    nickname: '먹는게제일좋아03',
    profileImageUrl: null,
    gradeName: '테하멤버',
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
        {/* Search Bar */}
        <div className="">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[50px] pl-4 pr-12 bg-gray-100 rounded-lg text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-gray-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
              >
                <IoClose size={20} className="text-gray-400" />
              </button>
            )}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
              <IoSearch size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="">
          {filtered.map((user) => {
            const isFollowing = getFollowState(user.id, user.isFollowing)
            return (
              <div
                key={user.id}
                className="flex items-center justify-between py-4 border-b border-gray-100"
              >
                {/* Left: Profile */}
                <div className="flex items-center gap-3">
                  <div className="relative w-[50px] h-[50px] rounded-full bg-gray-200 overflow-hidden">
                    {user.profileImageUrl ? (
                      <Image
                        src={user.profileImageUrl}
                        alt={user.nickname}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <div className="w-8 h-8 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[16px] font-bold">{user.nickname}</span>
                    <div className="flex items-center gap-1">
                      <Image
                        src="/images/icon-member-badge.png"
                        alt="멤버 배지"
                        width={16}
                        height={16}
                      />
                      <span className="text-[12px] text-[#FFA500]">{user.gradeName}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Button and Menu */}
                <div className="flex items-center gap-2">
                  {tab === 'follower' ? (
                    <button
                      onClick={() => handleRemoveFollower(user.id)}
                      className="px-5 py-2 rounded-md text-[14px] font-medium bg-white border border-gray-300 text-gray-600"
                    >
                      삭제
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollowToggle(user.id, user.isFollowing)}
                      className={`px-5 py-2 rounded-md text-[14px] font-medium ${
                        isFollowing ? 'bg-white border border-main text-main' : 'bg-main text-white'
                      }`}
                    >
                      {isFollowing ? '팔로잉' : '팔로우'}
                    </button>
                  )}
                  <button className="w-8 h-8 flex items-center justify-center">
                    <BsThreeDotsVertical size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
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
