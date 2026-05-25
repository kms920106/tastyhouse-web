import SearchResultPlaceList from './SearchResultPlaceList'

interface Props {
  query: string
  isLoggedIn: boolean
}

export default function SearchResultPlaceTabContent({ query, isLoggedIn }: Props) {
  return <SearchResultPlaceList query={query} isLoggedIn={isLoggedIn} />
}
