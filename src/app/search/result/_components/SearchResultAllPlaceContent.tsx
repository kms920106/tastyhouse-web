import SearchResultAllPlaceList from './SearchResultAllPlaceList'
import SearchResultAllSectionHeader from './SearchResultAllSectionHeader'

interface Props {
  query: string
  isLoggedIn: boolean
}

export default function SearchResultAllPlaceContent({ query, isLoggedIn }: Props) {
  return (
    <div className="px-[15px] py-[30px]">
      <SearchResultAllSectionHeader title="플레이스" />
      <SearchResultAllPlaceList query={query} isLoggedIn={isLoggedIn} />
    </div>
  )
}
