import type { SearchTab } from '@/domains/search/search.dto'
import SearchAllTabFetcher from './SearchAllTabFetcher'
import SearchMenuTabFetcher from './SearchMenuTabFetcher'
import SearchPlaceTabFetcher from './SearchPlaceTabFetcher'
import SearchResultHeader from './SearchResultHeader'
import SearchResultTabs from './SearchResultTabs'
import SearchReviewTabFetcher from './SearchReviewTabFetcher'

interface Props {
  query: string
  tab: SearchTab
}

export default function SearchResultPage({ query, tab }: Props) {
  return (
    <>
      <SearchResultHeader query={query} />
      <SearchResultTabs tab={tab} query={query} />
      {tab === 'all' && <SearchAllTabFetcher query={query} />}
      {tab === 'menu' && <SearchMenuTabFetcher query={query} />}
      {tab === 'review' && <SearchReviewTabFetcher query={query} />}
      {tab === 'place' && <SearchPlaceTabFetcher query={query} />}
    </>
  )
}
