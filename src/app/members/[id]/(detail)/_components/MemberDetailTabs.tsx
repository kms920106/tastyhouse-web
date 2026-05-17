'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import Image from 'next/image'
import MemberReviewListFetcher from './MemberReviewListFetcher'

export type MemberDetailTab = 'reviews'

interface Props {
  memberId: number
  initialTab: MemberDetailTab
}

export default function MemberDetailTabs({ memberId, initialTab }: Props) {
  return (
    <div className="flex-1 flex flex-col border-t border-[#eeeeee]">
      <Tabs value={initialTab} className="gap-0 flex flex-col flex-1">
        <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0 border-0 shadow-none">
          <TabsTrigger
            value="reviews"
            className="flex-1 h-full rounded-none border-0 border-b border-[#eeeeee] shadow-none cursor-pointer data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-main"
          >
            <Image
              src="/images/mypage/icon-review-on.png"
              alt="리뷰"
              width={22}
              height={25}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-0 flex flex-col flex-1 bg-[#f9f9f9]">
          <MemberReviewListFetcher memberId={memberId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
