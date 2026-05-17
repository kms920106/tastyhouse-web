import Avatar from '@/components/ui/Avatar'
import MemberNickname from '@/components/members/MemberNickname'
import TimeAgo from '@/components/reviews/TimeAgo'

interface Props {
  profileImageUrl: string | null
  nickname: string
  createdAt: string
}

export default function ReviewAuthorInfo({ profileImageUrl, nickname, createdAt }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src={profileImageUrl} alt={nickname} priority />
      <div className="flex flex-col gap-2">
        <MemberNickname size="md">{nickname}</MemberNickname>
        <TimeAgo date={createdAt} />
      </div>
    </div>
  )
}
