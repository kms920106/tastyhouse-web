import MemberSearchResultList from './MemberSearchResultList'

interface Props {
  searchQuery: string
}

export default function MemberSearchHContent({ searchQuery }: Props) {
  return (
    <div className="flex flex-col px-[15px] h-[calc(100dvh-55px)]">
      <MemberSearchResultList searchQuery={searchQuery} />
    </div>
  )
}
