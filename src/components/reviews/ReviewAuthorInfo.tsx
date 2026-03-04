import Avatar from '@/components/ui/Avatar'
import MemberNickname from '@/components/ui/MemberNickname'
import TimeAgo from '@/components/ui/TimeAgo'

interface ReviewAuthorInfoProps {
  profileImageUrl: string | null
  nickname: string
  createdAt: string
}

export default function ReviewAuthorInfo({
  profileImageUrl,
  nickname,
  createdAt,
}: ReviewAuthorInfoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src={profileImageUrl} alt={nickname} priority />
      <div className="flex flex-col gap-2">
        <MemberNickname>{nickname}</MemberNickname>
        <TimeAgo date={createdAt} />
      </div>
    </div>
  )
}
