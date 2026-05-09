'use client'

import ProfileImage from '@/components/account/profile/ProfileImage'
import MemberProfileCard from '@/components/member/MemberProfileCard'
import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import PenIcon from '@/components/ui/PenIcon'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  isLoggedIn: boolean
}

export default function MyPageProfile({ isLoggedIn }: Props) {
  const { memberProfile } = useMemberProfile({ enabled: isLoggedIn })

  if (!isLoggedIn) {
    return (
      <div className="flex-1 flex flex-col items-center bg-white">
        <div className="-mt-[63px] relative z-10">
          <ProfileImage profileImageUrl={null} />
        </div>
        <AppPrimaryButton asChild className="w-auto px-10 mt-[21px]">
          <Link href={PAGE_PATHS.AUTH_LOGIN}>로그인하기</Link>
        </AppPrimaryButton>
      </div>
    )
  }

  return (
    <MemberProfileCard
      memberId={memberProfile?.id ?? null}
      editSlot={
        <Link href={PAGE_PATHS.ACCOUNT_PROFILE}>
          <PenIcon />
        </Link>
      }
    />
  )
}
