import MemberSearchHContent from './MemberSearchHContent'
import MemberSearchHeader from './MemberSearchHeader'

interface Props {
  searchQuery: string
}

export default function MemberSearchPage({ searchQuery }: Props) {
  return (
    <>
      <MemberSearchHeader />
      <MemberSearchHContent searchQuery={searchQuery} />
    </>
  )
}
