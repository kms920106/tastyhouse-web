'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { useTabNavigation } from '@/hooks/useTabNavigation'
import { useState } from 'react'
import FollowerList from './FollowerList'
import FollowingList from './FollowingList'
import SearchInput from './SearchInput'

export type MemberFollowTab = 'following' | 'follower'

const TABS: { label: string; value: MemberFollowTab }[] = [
  { label: '팔로잉', value: 'following' },
  { label: '팔로워', value: 'follower' },
]

interface Props {
  memberId: number
  initialTab: MemberFollowTab
  isLoggedIn: boolean
  isOwner: boolean
}

export default function MemberFollowTabs({ memberId, initialTab, isLoggedIn, isOwner }: Props) {
  const { handleTabChange } = useTabNavigation()

  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChangeWithReset = (value: string) => {
    handleTabChange(value)
    setSearchQuery('')
  }

  return (
    <Tabs value={initialTab} onValueChange={handleTabChangeWithReset} className="gap-0">
      <TabsList className="w-full h-[50px] rounded-none bg-white p-0 sticky top-0 z-40 border-0 shadow-none">
        {TABS.map(({ label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex-1 h-full text-sm leading-[14px] text-foreground/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-main"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="following" className="mt-0">
        <div className="flex flex-col px-[15px] py-5 h-[calc(100dvh-50px)]">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <FollowingList memberId={memberId} searchQuery={searchQuery} isLoggedIn={isLoggedIn} />
        </div>
      </TabsContent>
      <TabsContent value="follower" className="mt-0">
        <div className="flex flex-col px-[15px] py-5 h-[calc(100dvh-50px)]">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <FollowerList
            memberId={memberId}
            searchQuery={searchQuery}
            isLoggedIn={isLoggedIn}
            isOwner={isOwner}
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}
