'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { RankPeriod } from '@/domains/rank'
import { useTabNavigation } from '@/hooks/useTabNavigation'
import { ReactNode } from 'react'

interface Props {
  initialTab: RankPeriod
  scheduleArea: ReactNode
  infoButton: ReactNode
  allContent: ReactNode
  monthlyContent: ReactNode
}

export default function RankMemberTabs({ initialTab, scheduleArea, infoButton, allContent, monthlyContent }: Props) {
  const { handleTabChange } = useTabNavigation()

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0">
      <div className="flex justify-between">
        <div className="flex gap-2.5">
          <TabsList className="flex items-start gap-3 p-0 bg-white">
            <TabsTrigger
              value="all"
              className="p-0 !h-[18px] text-lg leading-[18px] font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
            >
              전체
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="p-0 !h-[18px] text-lg leading-[18px] font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
            >
              이번 달
            </TabsTrigger>
          </TabsList>
          {infoButton}
        </div>
        {scheduleArea}
      </div>
      <TabsContent value="all" className="mt-0">
        <div className="flex flex-col flex-1 gap-2.5 py-[25px]">{allContent}</div>
        <div className="h-[142px]" />
      </TabsContent>
      <TabsContent value="monthly" className="mt-0">
        <div className="flex flex-col flex-1 gap-2.5 py-[25px]">{monthlyContent}</div>
        <div className="h-[142px]" />
      </TabsContent>
    </Tabs>
  )
}
