'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'
import { useCartInfo } from '@/hooks/useCartInfo'
import { removeFromCart, updateCartItemQuantity } from '@/lib/cart'
import {
  calculateTotalProductAmount,
  calculateTotalProductDiscount,
  calculateTotalProductPaymentAmount,
} from '@/lib/paymentCalculation'

import type { OrderItem } from '@/domains/order'
import { useEffect, useMemo, useState } from 'react'
import CartItemList from './CartItemList'
import CartOrderButton from './CartOrderButton'
import CartSelectionControl from './CartSelectionControl'
import PaymentSummary from './PaymentSummary'

interface CartSectionProps {
  placeId: number
}

export default function CartSection({ placeId }: CartSectionProps) {
  const { items: initialItems, placeName, isLoading } = useCartInfo()

  const [cartItems, setCartItems] = useState<OrderItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    setCartItems(initialItems)
    setSelectedKeys(new Set(initialItems.map((item) => item.optionKey)))
  }, [initialItems])

  const selectedItems = useMemo(
    () => cartItems.filter((item) => selectedKeys.has(item.optionKey)),
    [cartItems, selectedKeys],
  )

  const allSelected = cartItems.length > 0 && selectedKeys.size === cartItems.length
  const selectedCount = selectedKeys.size

  const totalProductAmount = calculateTotalProductAmount(selectedItems)
  const totalDiscountAmount = calculateTotalProductDiscount(selectedItems)
  const totalProductPaymentAmount = calculateTotalProductPaymentAmount(selectedItems)

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set())
    } else {
      setSelectedKeys(new Set(cartItems.map((item) => item.optionKey)))
    }
  }

  const handleToggleSelect = (optionKey: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(optionKey)) {
        next.delete(optionKey)
      } else {
        next.add(optionKey)
      }
      return next
    })
  }

  const handleQuantityChange = (optionKey: string, quantity: number) => {
    updateCartItemQuantity(optionKey, quantity)
    setCartItems((items) =>
      items.map((item) => (item.optionKey === optionKey ? { ...item, quantity } : item)),
    )
  }

  const handleRemove = (optionKey: string) => {
    removeFromCart(optionKey)
    setCartItems((items) => items.filter((item) => item.optionKey !== optionKey))
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      next.delete(optionKey)
      return next
    })
  }

  const handleDeleteSelected = () => {
    selectedKeys.forEach((key) => removeFromCart(key))
    setCartItems((items) => items.filter((item) => !selectedKeys.has(item.optionKey)))
    setSelectedKeys(new Set())
  }

  if (isLoading) {
    return (
      <section className="min-h-screen flex flex-col bg-white">
        <Header variant="white" height={55}>
          <HeaderLeft>
            <BackButton />
          </HeaderLeft>
          <HeaderCenter>
            <HeaderTitle>장바구니</HeaderTitle>
          </HeaderCenter>
        </Header>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[#aaaaaa]">장바구니를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex flex-col bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>장바구니</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        <BorderedSection className="border-t-0">
          <CartSelectionControl
            selectedCount={selectedCount}
            totalCount={cartItems.length}
            allSelected={allSelected}
            onToggleSelectAll={handleToggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        </BorderedSection>
        <BorderedSection>
          <CartItemList
            cartItems={cartItems}
            placeName={placeName}
            selectedKeys={selectedKeys}
            onToggleSelect={handleToggleSelect}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        </BorderedSection>
      </SectionStack>
      <PaymentSummary
        totalProductAmount={totalProductAmount}
        totalDiscountAmount={totalDiscountAmount}
        totalProductPaymentAmount={totalProductPaymentAmount}
      />
      <CartOrderButton placeId={placeId} />
    </section>
  )
}
