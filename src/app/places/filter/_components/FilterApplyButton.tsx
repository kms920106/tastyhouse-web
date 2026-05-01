import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'

interface Props {
  hasSelection: boolean
  onApply: () => void
}

export default function FilterApplyButton({ hasSelection, onApply }: Props) {
  return (
    <FixedBottomSection className="px-[15px] py-2.5">
      <AppPrimaryButton onClick={onApply} disabled={!hasSelection}>
        필터 적용
      </AppPrimaryButton>
    </FixedBottomSection>
  )
}
