'use client'

import type { SearchTab } from '@/domains/search/search.dto'
import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Props {
  tab: SearchTab
  query: string
}

const TABS: { label: string; value: SearchTab }[] = [
  { label: '전체', value: 'all' },
  { label: '메뉴', value: 'menu' },
  { label: '리뷰', value: 'review' },
  { label: '플레이스', value: 'place' },
]

export default function SearchResultTabs({ tab, query }: Props) {
  const router = useRouter()

  const handleTabClick = (value: SearchTab) => {
    router.replace(`${PAGE_PATHS.SEARCH_RESULT}?q=${encodeURIComponent(query)}&tab=${value}`)
  }

  return (
    <div className="border-b-2 border-[#eeeeee]">
      <div className="flex">
        {TABS.map(({ label, value }) => {
          const isActive = tab === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => handleTabClick(value)}
              className={cn(
                'flex-1 py-[15px] text-sm text-center relative',
                isActive ? 'font-bold text-main' : 'font-normal text-[#333333] opacity-40',
              )}
            >
              {label}
              {isActive && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-main" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
