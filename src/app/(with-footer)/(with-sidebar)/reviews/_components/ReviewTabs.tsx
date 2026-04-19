'use client'

import SectionStack from '@/components/ui/SectionStack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { ReviewType } from '@/domains/review'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import LatestReviewList from './LatestReviewList'

type TabValue = 'all' | 'following'

const reviewTypeMap: Record<TabValue, ReviewType> = {
  all: 'ALL',
  following: 'FOLLOWING',
}

interface ReviewTabsProps {
  initialTab: TabValue
}

export default function ReviewTabs({ initialTab }: ReviewTabsProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
      window.scrollTo({ top: 0, behavior: 'instant' })
    },
    [router, pathname],
  )

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0">
      <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
        <TabsTrigger
          value="all"
          className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main"
        >
          전체
        </TabsTrigger>
        <TabsTrigger
          value="following"
          className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main"
        >
          팔로잉
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-0">
        <SectionStack>
          <LatestReviewList reviewType={reviewTypeMap.all} />
        </SectionStack>
      </TabsContent>
      <TabsContent value="following" className="mt-0">
        <SectionStack>
          <LatestReviewList reviewType={reviewTypeMap.following} />
        </SectionStack>
      </TabsContent>
    </Tabs>
  )
}
