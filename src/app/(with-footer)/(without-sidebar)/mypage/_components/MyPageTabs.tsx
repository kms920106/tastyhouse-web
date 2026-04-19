'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import BookmarkListFetcher from './BookmarkListFetcher'
import { type MyPageTabValue } from './MyPageContent'
import OrderListFetcher from './OrderListFetcher'
import ReviewListFetcher from './ReviewListFetcher'

const TAB_TRIGGER_CLASS =
  'flex-1 h-full rounded-none border-0 border-b border-[#eeeeee] shadow-none cursor-pointer data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

const TAB_CONTENT_CLASS = 'mt-0 flex-1 bg-[#f9f9f9]'

interface MyPageTabsProps {
  initialTab: MyPageTabValue
}

export default function MyPageTabs({ initialTab }: MyPageTabsProps) {
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
      <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0 min-h-[50dvh]">
        <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
          <TabsTrigger value="reviews" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-review-${initialTab === 'reviews' ? 'on' : 'off'}.png`}
              alt="리뷰"
              width={22}
              height={25}
            />
          </TabsTrigger>
          <TabsTrigger value="payments" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-order-${initialTab === 'payments' ? 'on' : 'off'}.png`}
              alt="결제"
              width={34}
              height={25}
            />
          </TabsTrigger>
          <TabsTrigger value="bookmarks" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-place-bookmark-${initialTab === 'bookmarks' ? 'on' : 'off'}.png`}
              alt="저장"
              width={27}
              height={25}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className={TAB_CONTENT_CLASS}>
          <ReviewListFetcher />
        </TabsContent>
        <TabsContent value="payments" className={TAB_CONTENT_CLASS}>
          <OrderListFetcher />
        </TabsContent>
        <TabsContent value="bookmarks" className={TAB_CONTENT_CLASS}>
          <BookmarkListFetcher />
        </TabsContent>
      </Tabs>
    </div>
  )
}
