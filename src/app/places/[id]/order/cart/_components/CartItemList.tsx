import CartItem from '@/components/cart/CartItem'
import { PAGE_PATHS } from '@/lib/paths'
import type { OrderItem } from '@/domains/order'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LiaPlusSolid } from 'react-icons/lia'

interface Props {
  cartItems: OrderItem[]
  placeName: string
  selectedKeys: Set<string>
  onToggleSelect: (optionKey: string) => void
  onQuantityChange: (optionKey: string, quantity: number) => void
  onRemove: (optionKey: string) => void
}

export default function CartItemList({
  cartItems,
  placeName,
  selectedKeys,
  onToggleSelect,
  onQuantityChange,
  onRemove,
}: Props) {
  const router = useRouter()

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-base leading-[16px] text-[#aaaaaa]">장바구니가 비어있습니다.</p>
        <div className="mt-[15px]">
          <Link
            href={PAGE_PATHS.HOME}
            className="text-sm leading-[14px] text-[#a91201] underline"
          >
            메뉴 담으러 가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="px-[15px] divide-y divide-[#f2f2f2]">
        <h2 className="py-5 text-base leading-[16px]">{placeName}</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.optionKey}
            optionKey={item.optionKey}
            name={item.name}
            imageUrl={item.imageUrl}
            salePrice={item.salePrice}
            originalPrice={item.originalPrice}
            quantity={item.quantity}
            selected={selectedKeys.has(item.optionKey)}
            selectedOptions={item.selectedOptions}
            onToggleSelect={onToggleSelect}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="py-[18px] border-t border-[#f2f2f2] box-border">
        <div
          className="flex items-center justify-center gap-2.5 text-[#a91201]"
          onClick={() => router.back()}
        >
          {cartItems.length > 0 && <LiaPlusSolid size={20} />}
          <span className="text-sm leading-[14px]">메뉴 담으러 가기</span>
        </div>
      </div>
    </>
  )
}
