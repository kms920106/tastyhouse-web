import { getIsLoggedIn } from '@/lib/auth-config'
import MemberDetailPage from './_components/MemberDetailPage'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const memberId = Number(id)

  const isLoggedIn = await getIsLoggedIn()

  return <MemberDetailPage memberId={memberId} isLoggedIn={isLoggedIn} />
}
