import { cn } from '@/lib/utils'
import Link from 'next/link'
import { PAGE_PATHS } from '@/lib/paths'

interface PopularKeyword {
  rank: number
  keyword: string
  isNew: boolean
}

// TODO: API 연동 시 search.repository로 교체
const POPULAR_KEYWORDS: PopularKeyword[] = [
  { rank: 1, keyword: '홍대', isNew: false },
  { rank: 2, keyword: '데이트', isNew: false },
  { rank: 3, keyword: '치맥', isNew: false },
  { rank: 4, keyword: '냉모밀', isNew: false },
  { rank: 5, keyword: '가성비', isNew: false },
  { rank: 6, keyword: '혼밥', isNew: false },
  { rank: 7, keyword: '매운음식', isNew: false },
  { rank: 8, keyword: '카페', isNew: false },
  { rank: 9, keyword: '팥빙수', isNew: true },
  { rank: 10, keyword: '냉면', isNew: true },
]

export default function PopularKeywordListServer() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="text-base leading-[16px] font-bold mb-6">인기 검색어</h2>
      <ul className="flex flex-col gap-5 px-[15px]">
        {POPULAR_KEYWORDS.map(({ rank, keyword, isNew }) => (
          <li key={rank}>
            <Link
              href={`${PAGE_PATHS.SEARCH}?q=${encodeURIComponent(keyword)}`}
              className="flex items-center gap-5"
            >
              <span
                className={cn(
                  'w-5 text-sm font-normal text-right shrink-0',
                  rank <= 3 ? 'text-[#a91201]' : 'text-[#333333]',
                )}
              >
                {rank}
              </span>
              <span className="flex-1 text-sm leading-[16px] text-[#333333] font-regular">
                {keyword}
              </span>
              {isNew && <span className="text-sm leading-[16px] text-[#a91201]">NEW</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
