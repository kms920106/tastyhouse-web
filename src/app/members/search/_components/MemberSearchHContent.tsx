import MemberSearchResultList from './MemberSearchResultList'

interface Props {
  searchQuery: string
}

export default function MemberSearchHContent({ searchQuery }: Props) {
  return (
    <div className="flex flex-col px-[15px]">
      <MemberSearchResultList searchQuery={searchQuery} />
    </div>
  )
}
