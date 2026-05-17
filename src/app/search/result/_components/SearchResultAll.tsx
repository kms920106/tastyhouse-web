import SectionStack from '@/components/ui/SectionStack'
import SearchResultMenuPreviewFetcher from './SearchResultMenuPreviewFetcher'
import SearchResultPlacePreviewFetcher from './SearchResultPlacePreviewFetcher'
import SearchResultReviewPreviewFetcher from './SearchResultReviewPreviewFetcher'

interface Props {
  query: string
}

export default function SearchResultAll({ query }: Props) {
  return (
    <SectionStack>
      <SearchResultMenuPreviewFetcher query={query} />
      <SearchResultReviewPreviewFetcher query={query} />
      <SearchResultPlacePreviewFetcher query={query} />
    </SectionStack>
  )
}
