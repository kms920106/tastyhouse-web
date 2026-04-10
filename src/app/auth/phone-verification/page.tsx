import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import PhoneVerificationSection from './_components/PhoneVerificationSection'

interface PhoneVerificationPageProps {
  searchParams: Promise<{ next?: string }>
}

export default async function PhoneVerificationPage({ searchParams }: PhoneVerificationPageProps) {
  const { next } = await searchParams

  if (!next) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return <PhoneVerificationSection nextUrl={next} />
}
