import { getIsLoggedIn } from '@/lib/auth-config'
import MemberProfilePage from './_components/MemberProfileContent'

interface Props {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const memberId = Number(id)

  const isLoggedIn = await getIsLoggedIn()

  return <MemberProfilePage memberId={memberId} isLoggedIn={isLoggedIn} />
}
