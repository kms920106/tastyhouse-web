import ImageContainer from '@/components/ui/ImageContainer'
import ViewMoreButton from '@/components/ui/ViewMoreButton'
import { getPaymentStatusColor, getPaymentStatusName } from '@/constants/payment'
import { OrderListResponse } from '@/domains/order'
import { PaymentStatus } from '@/domains/payment/payment.type'
import { formatDate } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { formatOrderSummary } from '@/lib/order'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

interface OrderListItemProps {
  id: number
  placeThumbnailImageUrl: string
  placeName: string
  firstProductName: string
  totalItemCount: number
  price: number
  date: string
  paymentStatus: PaymentStatus
}

function OrderListItem({
  id,
  placeThumbnailImageUrl,
  placeName,
  firstProductName,
  totalItemCount,
  price,
  date,
  paymentStatus,
}: OrderListItemProps) {
  const statusColor = getPaymentStatusColor(paymentStatus)
  const statusName = getPaymentStatusName(paymentStatus)
  const formattedDate = formatDate(date, 'YY.MM.DD')

  return (
    <Link href={PAGE_PATHS.ORDER_DETAIL(id)} className="block">
      <div className="flex items-center justify-between py-[15px]">
        <div className="flex items-center gap-[15px]">
          <ImageContainer src={placeThumbnailImageUrl} alt={placeName} size={60} />
          <div className="flex-1 flex flex-col min-w-0">
            <p className="text-[11px] leading-[11px] text-[#888888] truncate">{placeName}</p>
            <p className="text-sm leading-[14px] mt-[7px]">
              {formatOrderSummary(firstProductName, totalItemCount)}
            </p>
            <p className="text-sm leading-[14px] mt-2.5">{formatNumber(price)}원</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-[7px] justify-between">
          <p className="text-[11px] leading-[11px] text-[#aaaaaa]">{formattedDate}</p>
          <p className="text-[11px] leading-[11px]" style={{ color: statusColor }}>
            {statusName}
          </p>
        </div>
      </div>
    </Link>
  )
}

interface OrderListProps {
  orders: OrderListResponse
  hasMoreOrders: boolean
}

export default function OrderList({ orders, hasMoreOrders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">결제 내역이 없습니다.</p>
        </div>
      </div>
    )
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
