import { searchRepository } from '@/domains/search/search.repository'
import type { PopularKeyword } from '@/domains/search/search.model'
import { PAGE_PATHS } from '@/lib/paths'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function PopularKeywordListServer() {
  const { error, data } = await searchRepository.getPopularKeywords()

  if (error || !data) {
    return (
      <div className="px-[15px] py-[30px]">
        <h2 className="text-base leading-[16px] font-bold mb-6">인기 검색어</h2>
        <p className="py-10 text-sm text-[#aaaaaa] text-center">
          {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
        </p>
      </div>
    )
  }

  const keywords: PopularKeyword[] = data

  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="text-base leading-[16px] font-bold mb-6">인기 검색어</h2>
      <ul className="flex flex-col gap-5 px-[15px]">
        {keywords.map(({ rank, keyword, isNew }) => (
          <li key={rank}>
            <Link
              href={`${PAGE_PATHS.SEARCH}?q=${encodeURIComponent(keyword)}`}
              className="flex items-center gap-5"
            >
              <span
                className={cn(
                  'w-5 text-sm font-normal text-right shrink-0',
                  rank <= 3 && 'text-main',
                )}
              >
                {rank}
              </span>
              <span className="flex-1 text-sm leading-[16px] font-regular">{keyword}</span>
              {isNew && <span className="text-sm leading-[16px] text-main">NEW</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
