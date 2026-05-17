import BorderedSection from '@/components/ui/BorderedSection'
import type { ProductOptionGroup } from '@/domains/product'
import PlaceOrderMenuDetailOptionItem from './PlaceOrderMenuDetailOptionItem'

interface Props {
  optionGroups: ProductOptionGroup[]
  selectedOptions: Record<number, number | number[]>
  onRadioSelect: (groupId: number, optionId: number) => void
  onCheckboxToggle: (groupId: number, optionId: number, maxSelect: number) => void
}

export default function PlaceOrderMenuDetailOptionList({
  optionGroups,
  selectedOptions,
  onRadioSelect,
  onCheckboxToggle,
}: Props) {
  return (
    <>
      {optionGroups.map((group) => (
        <BorderedSection key={group.id}>
          <div className="px-4 py-5">
            <h3 className="text-base leading-[16px] font-bold">
              {group.name}
              {group.isRequired && <span className="text-main ml-1">*</span>}
            </h3>
            <div className="flex flex-col gap-[15px] mt-5">
              {group.options.map((option) => (
                <PlaceOrderMenuDetailOptionItem
                  key={option.id}
                  option={option}
                  isMultiple={group.isMultipleSelect}
                  isSelected={
                    group.isMultipleSelect
                      ? (selectedOptions[group.id] as number[]).includes(option.id)
                      : selectedOptions[group.id] === option.id
                  }
                  onSelect={() =>
                    group.isMultipleSelect
                      ? onCheckboxToggle(group.id, option.id, group.maxSelect)
                      : onRadioSelect(group.id, option.id)
                  }
                />
              ))}
            </div>
          </div>
        </BorderedSection>
      ))}
    </>
  )
}
