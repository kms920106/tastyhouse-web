import Header, {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { memberRepository } from '@/domains/member/member.repository'
import Link from 'next/link'
import { AiOutlinePlus } from 'react-icons/ai'

interface Props {
  memberId: number
}

export default async function FollowsHeader({ memberId }: Props) {
  const { data } = await memberRepository.getOtherMemberProfile(memberId)
  const memberNickname = data?.nickname ?? ''

  return (
    <Header variant="white" height={55} showBorder={false}>
      <HeaderLeft>
        <BackButton />
      </HeaderLeft>
      <HeaderCenter>
        <HeaderTitle>{memberNickname}</HeaderTitle>
      </HeaderCenter>
      <HeaderRight>
        <Link href={'/members/search'}>
          <AiOutlinePlus size={22} />
        </Link>
      </HeaderRight>
    </Header>
  )
}
