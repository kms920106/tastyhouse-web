import HashTag from '@/components/ui/HashTag'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

// TODO: API 연동 시 search.repository로 교체
const RECOMMENDED_KEYWORDS = [
  '브런치',
  '인기검색어노출',
  '브런치',
  '인기검색어노출',
  '인기검색어노출',
  '브런치',
  '인기검색어노출',
]

export default function RecommendedKeywordListServer() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="text-base leading-[16px] font-bold mb-6">추천 검색어</h2>
      <div className="flex flex-wrap gap-2">
        {RECOMMENDED_KEYWORDS.map((keyword, i) => (
          <Link key={i} href={`${PAGE_PATHS.SEARCH}?q=${encodeURIComponent(keyword)}`}>
            <HashTag tag={keyword} variant="secondary" size="md" />
          </Link>
        ))}
      </div>
    </div>
  )
}
