import Avatar from '@/components/ui/Avatar'

interface ProfileImageProps {
  profileImageUrl: string | null | undefined
  alt?: string
}

export default function ProfileImage({
  profileImageUrl,
  alt = '프로필 이미지',
}: ProfileImageProps) {
  return <Avatar src={profileImageUrl} alt={alt} size="bg" />
}
