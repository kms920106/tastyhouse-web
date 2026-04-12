'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import { useRouter } from 'next/navigation'

export default function SignupCompleteConfirmButton() {
  const router = useRouter()

  return <AppPrimaryButton onClick={() => router.replace('/')}>확인</AppPrimaryButton>
}
