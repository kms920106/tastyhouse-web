'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { useTabNavigation } from '@/hooks/useTabNavigation'
import Image from 'next/image'
import BookmarkListFetcher from './BookmarkListFetcher'
import EmptyState from './EmptyState'
import { type MyPageTabValue } from './MyPage'
import OrderListFetcher from './OrderListFetcher'
import ReviewListFetcher from './ReviewListFetcher'

const TAB_TRIGGER_CLASS =
  'flex-1 h-full rounded-none border-0 border-b border-[#eeeeee] shadow-none cursor-pointer data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

const TAB_CONTENT_CLASS = 'mt-0 flex flex-col flex-1 bg-[#f9f9f9]'

interface Props {
  initialTab: MyPageTabValue
  isLoggedIn: boolean
}

export default function MyPageTabs({ initialTab, isLoggedIn }: Props) {
  const { handleTabChange } = useTabNavigation()

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
              alt="북마크"
              width={27}
              height={25}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className={TAB_CONTENT_CLASS}>
          {isLoggedIn ? (
            <ReviewListFetcher />
          ) : (
            <>
              <EmptyState message="로그인이 필요한 서비스입니다." />
              <div className="h-[70px]" />
            </>
          )}
        </TabsContent>
        <TabsContent value="payments" className={TAB_CONTENT_CLASS}>
          {isLoggedIn ? (
            <OrderListFetcher />
          ) : (
            <>
              <EmptyState message="로그인이 필요한 서비스입니다." />
              <div className="h-[70px]" />
            </>
          )}
        </TabsContent>
        <TabsContent value="bookmarks" className={TAB_CONTENT_CLASS}>
          {isLoggedIn ? (
            <BookmarkListFetcher />
          ) : (
            <>
              <EmptyState message="로그인이 필요한 서비스입니다." />
              <div className="h-[70px]" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
