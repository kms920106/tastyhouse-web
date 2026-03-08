'use client'

import AppInputText from '@/components/ui/AppInputText'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import FollowerList from './FollowerList'
import FollowingList from './FollowingList'

export type FollowTabValue = 'following' | 'follower'

const TAB_TRIGGER_CLASS =
  'flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative flex items-center shrink-0">
      <AppInputText
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="!bg-[#fafafa] rounded-[2.5px] border-[#eeeeee] pr-[40px]"
      />
      <button className="absolute right-[17px] top-1/2 -translate-y-1/2">
        <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
      </button>
    </div>
  )
}

interface FollowsTabsProps {
  memberId: number
  initialTab: FollowTabValue
}

export default function FollowsTabs({ memberId, initialTab }: FollowsTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [searchQuery, setSearchQuery] = useState('')

  const handleTabChange = useCallback(
    (tab: string) => {
      const params = new URLSearchParams()
      params.set('tab', tab)
      // router.push(`${pathname}?${params.toString()}`, { scroll: false })
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      setSearchQuery('')
    },
    [router, pathname],
  )

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
        <div className="flex flex-col px-[15px] py-5 h-[calc(100dvh-50px)]">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <FollowingList memberId={memberId} searchQuery={searchQuery} />
        </div>
      </TabsContent>
      <TabsContent value="follower" className="mt-0">
        <div className="flex flex-col px-[15px] py-5 h-[calc(100dvh-50px)]">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
          <FollowerList memberId={memberId} searchQuery={searchQuery} />
        </div>
      </TabsContent>
    </Tabs>
  )
}
