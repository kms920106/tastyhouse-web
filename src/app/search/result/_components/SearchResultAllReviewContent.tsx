import SearchResultAllReviewList from './SearchResultAllReviewList'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultAllReviewContent({ query }: Props) {
  return (
    <div className="px-[15px] py-[30px]">
      <SearchResultSectionHeader title="리뷰" />
      <SearchResultAllReviewList query={query} />
    </div>
  )
}
