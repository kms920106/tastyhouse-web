import { getIsLoggedIn } from '@/lib/auth-config'
import MemberDetailPage from './_components/MemberDetailPage'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const [{ id }, isLoggedIn] = await Promise.all([params, getIsLoggedIn()])
  const memberId = Number(id)

  return <MemberDetailPage memberId={memberId} isLoggedIn={isLoggedIn} />
}
