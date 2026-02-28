import OrderProductItem from '@/components/order/OrderProductItem'
import type { OrderItemResponse } from '@/domains/order'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface OrderedProductListProps {
  orderId: string | number
  placeName: string
  orderItems: OrderItemResponse[]
}

export default function OrderedProductList({
  orderId,
  placeName,
  orderItems,
}: OrderedProductListProps) {
  return (
    <>
      <div className="px-[15px] pt-5 pb-[15px]">
        <h2 className="text-base leading-[16px]">{placeName}</h2>
      </div>
      <div className="px-4 pb-[5px]">
        <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
          {orderItems.map((item) => (
            <OrderProductItem
              key={item.id}
              productName={item.productName}
              productImageUrl={item.productImageUrl}
              unitPrice={item.unitPrice}
              quantity={item.quantity}
              options={item.options}
              action={
                item.reviewed ? (
                  <Link
                    href={PAGE_PATHS.ORDER_REVIEW_EDIT(orderId, item.id)}
                    className="flex items-center justify-center shrink-0 px-[11px] py-2.5 text-xs leading-[12px] text-[#a91201] border border-[#a91201] box-border"
                  >
                    리뷰수정
                  </Link>
                ) : (
                  <Link
                    href={PAGE_PATHS.ORDER_REVIEW_CREATE(orderId, item.id)}
                    className="flex items-center justify-center shrink-0 px-[11px] py-2.5 bg-[#a91201] text-xs leading-[12px] text-white"
                  >
                    리뷰작성
                  </Link>
                )
              }
            />
          ))}
        </div>
      </div>
    </>
  )
}
