'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { useTabNavigation } from '@/hooks/useTabNavigation'
import SearchResultMenuTabFetcher from './SearchResultMenuTabFetcher'
import SearchResultPlaceTabFetcher from './SearchResultPlaceTabFetcher'
import SearchResultReviewTabFetcher from './SearchResultReviewTabFetcher'
import SearchResultAll from './SearchResultAll'

export type SearchTab = 'all' | 'menu' | 'review' | 'place'

const TABS: { label: string; value: SearchTab }[] = [
  { label: '전체', value: 'all' },
  { label: '메뉴', value: 'menu' },
  { label: '리뷰', value: 'review' },
  { label: '플레이스', value: 'place' },
]

interface Props {
  tab: SearchTab
  query: string
}

export default function SearchResultTabs({ tab, query }: Props) {
  const { handleTabChange } = useTabNavigation()

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="gap-0">
      <TabsList className="sticky top-0 w-full h-[50px] p-0 rounded-none bg-white z-40 border-0 shadow-none">
        {TABS.map(({ label, value }) => (
          <TabsTrigger
            key={value}
            value={value}
            className="flex-1 h-full text-sm leading-[14px] text-foreground/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-main"
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="all" className="mt-0">
        <SearchResultAll query={query} />
      </TabsContent>
      <TabsContent value="menu" className="mt-0">
        <SearchResultMenuTabFetcher query={query} />
      </TabsContent>
      <TabsContent value="review" className="mt-0">
        <SearchResultReviewTabFetcher query={query} />
      </TabsContent>
      <TabsContent value="place" className="mt-0">
        <SearchResultPlaceTabFetcher query={query} />
      </TabsContent>
    </Tabs>
  )
}
