'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import ConfirmModal from '@/components/ui/ConfirmModal'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import type { ProductOption, ProductOptionGroup } from '@/domains/product'
import { CartSelectedOption, addToCart, getCartPlaceId, replaceCartAndAdd } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { IoIosCheckbox, IoIosCheckboxOutline } from 'react-icons/io'
import { RiRadioButtonFill } from 'react-icons/ri'
import ProductReviewTab from './ProductReviewTab'

interface ProductOptionSelectorProps {
  productId: number
  placeId: number
  optionGroups: ProductOptionGroup[]
  reviewCount: number
}

export default function ProductOptionSelector({
  productId,
  placeId,
  optionGroups,
  reviewCount,
}: ProductOptionSelectorProps) {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('options')
  const [showPlaceChangeModal, setShowPlaceChangeModal] = useState(false)

  // 각 옵션 그룹별 선택 상태 관리
  // isMultipleSelect가 false면 단일 선택(number), true면 다중 선택(number[])
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number | number[]>>(() => {
    const initial: Record<number, number | number[]> = {}
    optionGroups.forEach((group) => {
      if (group.isMultipleSelect) {
        initial[group.id] = []
      } else {
        // 기본값으로 첫 번째 옵션 선택
        const firstOption = group.options.find((opt) => !opt.isSoldOut)
        initial[group.id] = firstOption?.id ?? -1
      }
    })
    return initial
  })

  // 단일 선택 (라디오)
  const handleRadioSelect = useCallback((groupId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }))
  }, [])

  // 다중 선택 (체크박스)
  const handleCheckboxToggle = useCallback(
    (groupId: number, optionId: number, maxSelect: number) => {
      setSelectedOptions((prev) => {
        const current = prev[groupId] as number[]
        if (current.includes(optionId)) {
          // 이미 선택된 경우 해제
          return {
            ...prev,
            [groupId]: current.filter((id) => id !== optionId),
          }
        } else {
          // 최대 선택 개수 체크
          if (current.length >= maxSelect) {
            return prev
          }
          return {
            ...prev,
            [groupId]: [...current, optionId],
          }
        }
      })
    },
    [],
  )

  // 선택된 옵션 정보 추출 (ID만)
  const getSelectedOptionsData = useCallback((): CartSelectedOption[] => {
    const result: CartSelectedOption[] = []

    optionGroups.forEach((group) => {
      const selected = selectedOptions[group.id]

      if (group.isMultipleSelect) {
        const selectedIds = selected as number[]
        selectedIds.forEach((optionId) => {
          result.push({ groupId: group.id, optionId })
        })
      } else {
        const optionId = selected as number
        if (optionId !== -1) {
          result.push({ groupId: group.id, optionId })
        }
      }
    })

    return result
  }, [optionGroups, selectedOptions])

  // 필수 옵션 검증
  const validateRequiredOptions = useCallback((): boolean => {
    const missingRequired = optionGroups.filter((group) => {
      if (!group.isRequired) return false
      const selected = selectedOptions[group.id]
      if (group.isMultipleSelect) {
        return (selected as number[]).length < group.minSelect
      }
      return selected === -1
    })

    if (missingRequired.length > 0) {
      alert(`필수 옵션을 선택해주세요: ${missingRequired.map((g) => g.name).join(', ')}`)
      return false
    }
    return true
  }, [optionGroups, selectedOptions])

  // 실제 장바구니 추가 실행
  const executeAddToCart = useCallback(
    (replace: boolean = false) => {
      const selectedOptionsData = getSelectedOptionsData()
      const cartItem = { productId, selectedOptions: selectedOptionsData }

      if (replace) {
        replaceCartAndAdd(placeId, cartItem)
      } else {
        addToCart(placeId, cartItem)
      }

      window.dispatchEvent(new Event('cartUpdated'))
      toast('메뉴를 장바구니에 담았습니다.')
      router.back()
    },
    [productId, placeId, getSelectedOptionsData, router],
  )

  // 장바구니에 담기
  const handleAddToCart = useCallback(() => {
    if (!validateRequiredOptions()) return

    const currentCartPlaceId = getCartPlaceId()

    // 장바구니가 비어있거나 같은 가게면 바로 추가
    if (currentCartPlaceId === null || currentCartPlaceId === placeId) {
      executeAddToCart()
      return
    }

    // 다른 가게면 확인 팝업 표시
    setShowPlaceChangeModal(true)
  }, [placeId, validateRequiredOptions, executeAddToCart])

  // 가게 변경 확인
  const handleConfirmPlaceChange = useCallback(() => {
    setShowPlaceChangeModal(false)
    executeAddToCart(true)
  }, [executeAddToCart])

  return (
    <>
      <BorderedSection className="border-b-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
          <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
            <TabsTrigger
              value="options"
              className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
            >
              옵션
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
            >
              리뷰 ({reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="options" className="mt-0">
            <SectionStack>
              {optionGroups.map((group) => (
                <BorderedSection key={group.id}>
                  <div className="px-4 py-5">
                    <h3 className="text-base leading-[16px] font-bold">
                      {group.name}
                      {group.isRequired && <span className="text-main ml-1">*</span>}
                    </h3>
                    <div className="flex flex-col gap-[15px] mt-5">
                      {group.options.map((option) => (
                        <OptionItem
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
                              ? handleCheckboxToggle(group.id, option.id, group.maxSelect)
                              : handleRadioSelect(group.id, option.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </BorderedSection>
              ))}
            </SectionStack>
          </TabsContent>
          <TabsContent value="reviews" className="mt-0">
            <ProductReviewTab productId={productId} />
          </TabsContent>
        </Tabs>
      </BorderedSection>
      <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
        <AppPrimaryButton onClick={handleAddToCart}>
          장바구니 담기
        </AppPrimaryButton>
      </FixedBottomSection>
      <ConfirmModal
        open={showPlaceChangeModal}
        description="가게를 변경하실 경우 장바구니에 담은 메뉴가 삭제됩니다."
        onConfirm={handleConfirmPlaceChange}
        onCancel={() => setShowPlaceChangeModal(false)}
      />
    </>
  )
}

interface OptionItemProps {
  option: ProductOption
  isMultiple: boolean
  isSelected: boolean
  onSelect: () => void
}

function OptionItem({ option, isMultiple, isSelected, onSelect }: OptionItemProps) {
  const isDisabled = option.isSoldOut

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`flex items-center gap-2.5 w-full text-left cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isMultiple ? (
        isSelected ? (
          <IoIosCheckbox size={28} className="text-main flex-shrink-0" />
        ) : (
          <IoIosCheckboxOutline size={28} className="text-[#dddddd] flex-shrink-0" />
        )
      ) : isSelected ? (
        <RiRadioButtonFill size={28} className="text-main flex-shrink-0" />
      ) : (
        <RiRadioButtonFill size={28} className="text-[#dddddd] flex-shrink-0" />
      )}
      <span className="flex-1 text-sm leading-[14px]">
        {option.name}
        {option.isSoldOut && <span className="text-[#aaaaaa] ml-2">(품절)</span>}
      </span>
      {option.additionalPrice > 0 && (
        <span className="text-sm leading-[14px]">+{option.additionalPrice.toLocaleString()}원</span>
      )}
    </button>
  )
}
