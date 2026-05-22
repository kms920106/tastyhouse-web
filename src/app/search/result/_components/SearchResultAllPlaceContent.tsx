import SearchResultAllPlaceList from './SearchResultAllPlaceList'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultAllPlaceContent({ query }: Props) {
  return (
    <div className="px-[15px] py-[30px]">
      <SearchResultSectionHeader title="플레이스" />
      <SearchResultAllPlaceList query={query} />
    </div>
  )
}
