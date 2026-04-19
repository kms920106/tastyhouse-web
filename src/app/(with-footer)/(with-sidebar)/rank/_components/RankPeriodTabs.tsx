'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { RankPeriod } from '@/domains/rank'
import { useRouter } from 'next/navigation'

interface RankPeriodTabsProps {
  initialTab: RankPeriod
}

export default function RankPeriodTabs({ initialTab }: RankPeriodTabsProps) {
  const router = useRouter()

  const handleTabChange = (value: string) => {
    const newType = value === 'monthly' ? 'monthly' : 'all'
    router.push(`/rank?type=${newType}`)
  }

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange}>
      <TabsList className="flex items-start gap-3 p-0 bg-white">
        <TabsTrigger
          className="p-0 !h-[18px] text-lg leading-[18px] font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
          value="all"
        >
          전체
        </TabsTrigger>
        <TabsTrigger
          className="p-0 !h-[18px] text-lg leading-[18px] font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
          value="monthly"
        >
          이번 달
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
