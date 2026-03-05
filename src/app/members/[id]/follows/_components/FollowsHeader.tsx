import Header, {
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
  HeaderTitle,
} from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import { memberRepository } from "@/domains/member"
import { AiOutlinePlus } from 'react-icons/ai'

interface FollowsHeaderProps {
  memberId: number
}

export default async function FollowsHeader({ memberId }: FollowsHeaderProps) {
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
        <AiOutlinePlus size={22} />
      </HeaderRight>
    </Header>
  )
}
