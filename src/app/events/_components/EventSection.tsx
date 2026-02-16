'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import OngoingEventList from './OngoingEventList'

type TabValue = 'ongoing' | 'ended' | 'winner'

interface EventSectionProps {
  initialTab: TabValue
}

export default function EventSection({ initialTab }: EventSectionProps) {
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
          value="ongoing"
          className="flex-1 h-full text-[14px] text-[#aaaaaa] border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#a11c20]"
        >
          진행중 이벤트
        </TabsTrigger>
        <TabsTrigger
          value="ended"
          className="flex-1 h-full text-[14px] text-[#aaaaaa] border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#a11c20]"
        >
          종료된 이벤트
        </TabsTrigger>
        <TabsTrigger
          value="winner"
          className="flex-1 h-full text-[14px] text-[#aaaaaa] border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#a11c20]"
        >
          당첨자 발표
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ongoing" className="mt-0">
        <OngoingEventList />
      </TabsContent>
      <TabsContent value="ended" className="mt-0">
        {/* TODO: 종료된 이벤트 목록 구현 */}
        <div className="p-4 text-center text-gray-500">종료된 이벤트가 없습니다.</div>
      </TabsContent>
      <TabsContent value="winner" className="mt-0">
        {/* TODO: 당첨자 발표 목록 구현 */}
        <div className="p-4 text-center text-gray-500">당첨자 발표가 없습니다.</div>
      </TabsContent>
    </Tabs>
  )
}
