'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import ActiveEventList from './ActiveEventList'
import EndedEventList from './EndedEventList'
import HeaderSection from './HeaderSection'
import WinnerEventList from './WinnerEventList'

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
    <>
      <HeaderSection />
      <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0">
        <div className="px-[23px] pt-5 pb-10">
          <TabsList className="w-full h-[46px] bg-transparent rounded-none p-0 gap-0">
            <TabsTrigger
              value="ongoing"
              className="flex-1 h-full text-[14px] text-[#aaaaaa] bg-transparent border border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-[#a11c20]"
            >
              진행중 이벤트
            </TabsTrigger>
            <TabsTrigger
              value="ended"
              className="flex-1 h-full text-[14px] text-[#aaaaaa] bg-transparent border border-l-0 border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-[#a11c20]"
            >
              종료된 이벤트
            </TabsTrigger>
            <TabsTrigger
              value="winner"
              className="flex-1 h-full text-[14px] text-[#aaaaaa] bg-transparent border border-l-0 border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-[#a11c20]"
            >
              당첨자 발표
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="ongoing" className="mt-0">
          <ActiveEventList />
        </TabsContent>
        <TabsContent value="ended" className="mt-0">
          <EndedEventList />
        </TabsContent>
        <TabsContent value="winner" className="mt-0">
          <WinnerEventList />
        </TabsContent>
      </Tabs>
    </>
  )
}
