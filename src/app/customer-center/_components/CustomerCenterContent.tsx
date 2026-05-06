import SectionStack from '@/components/ui/SectionStack'
import CustomerCenterCallSection from './CustomerCenterCallSection'
import CustomerCenterGuideSection from './CustomerCenterGuideSection'
import BorderedSection from '@/components/ui/BorderedSection'

export default function CustomerCenterContent() {
  return (
    <SectionStack>
      <BorderedSection>
        <CustomerCenterCallSection />
      </BorderedSection>
      <BorderedSection className="border-b-0">
        <CustomerCenterGuideSection />
      </BorderedSection>
    </SectionStack>
  )
}
