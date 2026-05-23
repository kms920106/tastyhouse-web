import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import SearchResultAllMenuContent from './SearchResultAllMenuContent'
import SearchResultAllPlaceContent from './SearchResultAllPlaceContent'
import SearchResultAllReviewContent from './SearchResultAllReviewContent'

interface Props {
  query: string
  isLoggedIn: boolean
}

export default function SearchResultAllContent({ query, isLoggedIn }: Props) {
  return (
    <SectionStack>
      <BorderedSection>
        <SearchResultAllMenuContent query={query} />
      </BorderedSection>
      <BorderedSection>
        <SearchResultAllReviewContent query={query} />
      </BorderedSection>
      <BorderedSection>
        <SearchResultAllPlaceContent query={query} isLoggedIn={isLoggedIn} />
      </BorderedSection>
    </SectionStack>
  )
}
