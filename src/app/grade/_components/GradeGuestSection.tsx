import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

export default function GradeGuestSection() {
  return (
    <div className="px-[15px] py-[25px] text-center">
      <p className="text-base leading-[16px] text-[#999999]">
        로그인 후 내 등급을 확인할 수 있어요
      </p>
      <AppPrimaryButton asChild className="mt-6">
        <Link href={PAGE_PATHS.AUTH_LOGIN}>로그인하기</Link>
      </AppPrimaryButton>
    </div>
  )
}
