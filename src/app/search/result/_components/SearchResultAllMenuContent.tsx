import SearchResultMenuPreviewFetcher from './SearchResultMenuPreviewFetcher'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultAllMenuContent({ query }: Props) {
  return (
    <div className="px-[15px] py-[30px]">
      <SearchResultSectionHeader title="메뉴" />
      <SearchResultMenuPreviewFetcher query={query} />
    </div>
  )
}
