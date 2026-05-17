'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { useTabNavigation } from '@/hooks/useTabNavigation'
import ActiveEventList from './ActiveEventList'
import EndedEventList from './EndedEventList'
import WinnerEventList from './WinnerEventList'

export type EventTab = 'ongoing' | 'ended' | 'winner'

const TABS: { label: string; value: EventTab }[] = [
  { label: '진행중 이벤트', value: 'ongoing' },
  { label: '종료된 이벤트', value: 'ended' },
  { label: '당첨자 발표', value: 'winner' },
]

interface Props {
  initialTab: EventTab
}

export default function EventTabs({ initialTab }: Props) {
  const { handleTabChange } = useTabNavigation()

  return (
    <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0">
      <div className="px-[23px] pt-5 pb-10">
        <TabsList className="w-full h-[46px] bg-transparent rounded-none p-0 gap-0">
          {TABS.map(({ label, value }, index) => (
            <TabsTrigger
              key={value}
              value={value}
              className={
                index === 0
                  ? 'flex-1 h-full text-[14px] text-[#aaaaaa] bg-transparent border border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-[#a11c20]'
                  : 'flex-1 h-full text-[14px] text-[#aaaaaa] bg-transparent border border-l-0 border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:bg-transparent data-[state=active]:text-[#a11c20] data-[state=active]:font-normal data-[state=active]:shadow-none data-[state=active]:border-l data-[state=active]:border-[#a11c20]'
              }
            >
              {label}
            </TabsTrigger>
          ))}
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
  )
}
