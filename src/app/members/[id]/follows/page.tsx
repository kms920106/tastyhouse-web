import { getIsLoggedIn } from '@/lib/auth-config'
import MemberFollowPage, { FollowTabValue } from './_components/MemberFollowPage'
import { memberService } from '@/domains/member/member.service'

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ tab?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params
  const { tab } = await searchParams
  const initialTab = (tab === 'follower' ? 'follower' : 'following') as FollowTabValue
  const isLoggedIn = await getIsLoggedIn()

  let isOwner = false
  if (isLoggedIn) {
    const member = await memberService.getMe()
    isOwner = member?.data?.id === Number(id)
  }

  return (
    <MemberFollowPage
      memberId={Number(id)}
      initialTab={initialTab}
      isLoggedIn={isLoggedIn}
      isOwner={isOwner}
    />
  )
}
