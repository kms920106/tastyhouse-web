import EmptyState from '@/app/(with-footer)/(without-sidebar)/mypage/_components/EmptyState'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { OrderListResponse } from '@/domains/order'
import { PAGE_PATHS } from '@/lib/paths'
import OrderListItem from './OrderListItem'

interface Props {
  orders: OrderListResponse
  hasMoreOrders: boolean
}

export default function OrderList({ orders, hasMoreOrders }: Props) {
  if (orders.length === 0) {
    return <EmptyState message="결제 내역이 없습니다." />
  }

  return (
    <>
      <div className="px-[15px] py-[5px] bg-white divide-y divide-[#eeeeee]">
        {orders.map((payment) => (
          <OrderListItem
            key={payment.id}
            id={payment.id}
            placeThumbnailImageUrl={payment.placeThumbnailImageUrl}
            placeName={payment.placeName}
            firstProductName={payment.firstProductName}
            totalItemCount={payment.totalItemCount}
            price={payment.amount}
            date={payment.paymentDate}
            paymentStatus={payment.paymentStatus}
          />
        ))}
      </div>
      {hasMoreOrders && (
        <div className="flex justify-center py-5">
          <ViewMoreButton href={PAGE_PATHS.ORDERS} label="더 보러가기" />
        </div>
      )}
      <div className="h-[70px]"></div>
    </>
  )
}
