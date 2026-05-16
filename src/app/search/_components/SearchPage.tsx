import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { Suspense } from 'react'
import PopularKeywordListServer from './PopularKeywordListServer'
import PopularKeywordListSkeleton from './PopularKeywordListSkeleton'
import RecommendedKeywordListServer from './RecommendedKeywordListServer'
import RecommendedKeywordListSkeleton from './RecommendedKeywordListSkeleton'
import SearchHeader from './SearchHeader'
import SearchResultsFetcher from './SearchResultsFetcher'

interface Props {
  query: string
}

export default function SearchPage({ query }: Props) {
  return (
    <>
      <SearchHeader initialQuery={query} />
      {query ? (
        <SearchResultsFetcher query={query} />
      ) : (
        <SectionStack className="flex-1">
          <BorderedSection>
            <Suspense fallback={<PopularKeywordListSkeleton />}>
              <PopularKeywordListServer />
            </Suspense>
          </BorderedSection>
          <BorderedSection>
            <Suspense fallback={<RecommendedKeywordListSkeleton />}>
              <RecommendedKeywordListServer />
            </Suspense>
          </BorderedSection>
        </SectionStack>
      )}
    </>
  )
}
