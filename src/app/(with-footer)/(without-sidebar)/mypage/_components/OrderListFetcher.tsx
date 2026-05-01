'use client'

import { getOrderList } from '@/actions/order'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import OrderList from './OrderList'
import { OrderListSkeleton } from './OrderListSkeleton'

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

  if (error || !data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('주문 내역')} />
  }

  return <OrderList orders={data.orders} hasMoreOrders={data.hasMoreOrders} />
}
