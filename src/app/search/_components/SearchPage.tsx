import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PopularKeywordContent from './PopularKeywordContent'
import RecommendedKeywordContent from './RecommendedKeywordContent'
import SearchHeader from './SearchHeader'
import SearchResultsFetcher from './SearchResultsFetcher'

interface Props {
  query: string
}

export default function SearchPage({ query }: Props) {
  return (
    <>
      <SearchHeader initialQuery={query} />
      {query ? (
        <SearchResultsFetcher query={query} />
      ) : (
        <SectionStack className="flex-1">
          <BorderedSection>
            <PopularKeywordContent />
          </BorderedSection>
          <BorderedSection>
            <RecommendedKeywordContent />
          </BorderedSection>
        </SectionStack>
      )}
    </>
  )
}
