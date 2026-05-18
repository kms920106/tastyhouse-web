import SearchResultPlacePreviewFetcher from './SearchResultPlacePreviewFetcher'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultAllPlaceContent({ query }: Props) {
  return (
    <div className="px-[15px] py-[30px]">
      <SearchResultSectionHeader title="플레이스" />
      <SearchResultPlacePreviewFetcher query={query} />
    </div>
  )
}
