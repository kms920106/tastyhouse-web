'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getOrderList } from '@/services/order'
import { useQuery } from '@tanstack/react-query'
import OrderList from './OrderList'

function OrderListSkeleton() {
  return (
    <div className="px-[15px] py-[5px] bg-white divide-y divide-[#eeeeee]">
      {Array.from({ length: 3 }).map((_, index) => (
        <OrderListItemSkeleton key={index} />
      ))}
    </div>
  )
}

function OrderListItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-[15px]">
      <div className="flex items-center gap-[15px]">
        <Skeleton className="w-[60px] h-[60px] rounded-md" />
        <div className="flex flex-col">
          <Skeleton className="h-[11px] w-[60px]" />
          <Skeleton className="h-[14px] w-[120px] mt-[7px]" />
          <Skeleton className="h-[14px] w-[80px] mt-2.5" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-[7px]">
        <Skeleton className="h-[11px] w-[55px]" />
        <Skeleton className="h-[11px] w-[45px]" />
      </div>
    </div>
  )
}

export default function OrderListFetcher() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['mypage', 'orders'],
    queryFn: async () => {
      const response = await getOrderList(0, 10)
      return {
        orders: response.data || [],
        hasMoreOrders: (response.pagination?.totalElements ?? 0) > 10,
      }
    },
  })

  if (isLoading) {
    return <OrderListSkeleton />
  }

  if (error) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 내역')}
        className="py-10 bg-white"
      />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 내역')}
        className="py-10 bg-white"
      />
    )
  }

  return <OrderList orders={data.orders} hasMoreOrders={data.hasMoreOrders} />
}
