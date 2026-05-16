import type { SearchTab } from '@/domains/search/search.dto'
import SearchResultHeader from './SearchResultHeader'
import SearchResultMenuTabFetcher from './SearchResultMenuTabFetcher'
import SearchResultPlaceTabFetcher from './SearchResultPlaceTabFetcher'
import SearchResultReviewTabFetcher from './SearchResultReviewTabFetcher'
import SearchResultSearchAllTabFetcher from './SearchResultSearchAllTabFetcher'
import SearchResultTabs from './SearchResultTabs'

interface Props {
  query: string
  tab: SearchTab
}

export default function SearchResultPage({ query, tab }: Props) {
  return (
    <>
      <SearchResultHeader query={query} />
      <SearchResultTabs tab={tab} query={query} />
      {tab === 'all' && <SearchResultSearchAllTabFetcher query={query} />}
      {tab === 'menu' && <SearchResultMenuTabFetcher query={query} />}
      {tab === 'review' && <SearchResultReviewTabFetcher query={query} />}
      {tab === 'place' && <SearchResultPlaceTabFetcher query={query} />}
    </>
  )
}
