import { Suspense } from 'react'
import RecommendedKeywordList from './RecommendedKeywordList'
import RecommendedKeywordListSkeleton from './RecommendedKeywordListSkeleton'

export default function RecommendedKeywordContent() {
  return (
    <div className="px-[15px] py-[30px]">
      <h2 className="text-base leading-[16px] font-bold mb-6">추천 검색어</h2>
      <Suspense fallback={<RecommendedKeywordListSkeleton />}>
        <RecommendedKeywordList />
      </Suspense>
    </div>
  )
}
