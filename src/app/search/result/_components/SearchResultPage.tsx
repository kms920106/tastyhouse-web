import type { SearchTab } from '@/domains/search/search.type'
import SearchResultHeader from './SearchResultHeader'
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
    </>
  )
}
