import { searchRepository } from '@/domains/search/search.repository'
import type { RecommendedKeyword } from '@/domains/search/search.model'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { PAGE_PATHS } from '@/lib/paths'
import HashTag from '@/components/ui/HashTag'
import Link from 'next/link'

export default async function RecommendedKeywordListServer() {
  const { error, status, data } = await searchRepository.getRecommendedKeywords()

  if ((error && status === 404) || !data) {
    return (
      <div className="px-[15px] py-[30px]">
        <h2 className="text-base leading-[16px] font-bold mb-6">추천 검색어</h2>
        <p className="py-10 text-sm text-[#aaaaaa] text-center">
          {COMMON_ERROR_MESSAGES.FETCH_ERROR('추천 검색어')}
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-[15px] py-[30px]">
        <h2 className="text-base leading-[16px] font-bold mb-6">추천 검색어</h2>
        <p className="py-10 text-sm text-[#aaaaaa] text-center">
          {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
        </p>
      </div>
    )
  }

  const keywords: RecommendedKeyword[] = data

  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="text-base leading-[16px] font-bold mb-6">추천 검색어</h2>
      <div className="flex flex-wrap gap-2">
        {keywords.map(({ keyword }, i) => (
          <Link key={i} href={`${PAGE_PATHS.SEARCH}?q=${encodeURIComponent(keyword)}`}>
            <HashTag tag={keyword} variant="secondary" size="md" />
          </Link>
        ))}
      </div>
    </div>
  )
}
