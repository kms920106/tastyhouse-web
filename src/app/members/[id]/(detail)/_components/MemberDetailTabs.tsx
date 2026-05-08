'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import MemberReviewListFetcher from './MemberReviewListFetcher'

export type MemberDetailTabValue = 'reviews'

const TAB_TRIGGER_CLASS =
  'flex-1 h-full rounded-none border-0 border-b border-[#eeeeee] shadow-none cursor-pointer data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

const TAB_CONTENT_CLASS = 'mt-0 flex flex-col flex-1 bg-[#f9f9f9]'

interface Props {
  memberId: number
  initialTab?: MemberDetailTabValue
}

export default function MemberDetailTabs({ memberId, initialTab = 'reviews' }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname],
  )

  return (
    <div className="flex-1 flex flex-col border-t border-[#eeeeee]">
      <Tabs
        value={initialTab}
        onValueChange={handleTabChange}
        className="gap-0 flex flex-col flex-1"
      >
        <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
          <TabsTrigger value="reviews" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-review-${initialTab === 'reviews' ? 'on' : 'off'}.png`}
              alt="리뷰"
              width={22}
              height={25}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className={TAB_CONTENT_CLASS}>
          <MemberReviewListFetcher memberId={memberId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
