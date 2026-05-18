import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import SearchResultMenuPreviewFetcher from './SearchResultMenuPreviewFetcher'
import SearchResultPlacePreviewFetcher from './SearchResultPlacePreviewFetcher'
import SearchResultReviewPreviewFetcher from './SearchResultReviewPreviewFetcher'
import SearchResultSectionHeader from './SearchResultSectionHeader'

interface Props {
  query: string
}

export default function SearchResultContent({ query }: Props) {
  return (
    <SectionStack>
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SearchResultSectionHeader title="메뉴" />
          <SearchResultMenuPreviewFetcher query={query} />
        </div>
      </BorderedSection>
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SearchResultSectionHeader title="리뷰" />
          <SearchResultReviewPreviewFetcher query={query} />
        </div>
      </BorderedSection>
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SearchResultSectionHeader title="플레이스" />
          <SearchResultPlacePreviewFetcher query={query} />
        </div>
      </BorderedSection>
    </SectionStack>
  )
}
