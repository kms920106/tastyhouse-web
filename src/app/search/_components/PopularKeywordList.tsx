import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import type { PopularKeyword } from '@/domains/search/search.model'
import { searchRepository } from '@/domains/search/search.repository'
import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default async function PopularKeywordList() {
  const { error, status, data } = await searchRepository.getPopularKeywords()

  if ((error && status === 404) || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('인기 검색어')} />
  }

  if (error) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  const keywords: PopularKeyword[] = data

  return (
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
  )
}
