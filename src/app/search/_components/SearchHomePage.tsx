import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import PopularKeywordContent from './PopularKeywordContent'
import RecommendedKeywordContent from './RecommendedKeywordContent'
import SearchHeader from './SearchHeader'

export default function SearchHomePage() {
  return (
    <>
      <SearchHeader />
      <SectionStack className="flex-1">
        <BorderedSection>
          <PopularKeywordContent />
        </BorderedSection>
        <BorderedSection>
          <RecommendedKeywordContent />
        </BorderedSection>
      </SectionStack>
    </>
  )
}
