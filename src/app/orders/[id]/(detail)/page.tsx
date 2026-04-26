import { getIsLoggedIn } from '@/lib/auth-config'
import { redirect } from 'next/navigation'
import OrderDetailPage from './_components/OrderDetailPage'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const orderId = Number(id)

  const isLoggedIn = await getIsLoggedIn()
  if (!isLoggedIn) {
    redirect('/auth/login')
  }

  return <OrderDetailPage orderId={orderId} />
}
