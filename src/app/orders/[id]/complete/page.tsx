import { getIsLoggedIn } from '@/lib/auth-config'
import { redirect } from 'next/navigation'
import OrderCompletePage from './_components/OrderCompletePage'

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

  return <OrderCompletePage orderId={orderId} />
}
