import { PAGE_PATHS } from '@/lib/paths'
import { redirect } from 'next/navigation'
import KakaoLinkSection from './_components/KakaoLinkSection'

interface KakaoLinkPageProps {
  searchParams: Promise<{ accessToken?: string; email?: string }>
}

export default async function KakaoLinkPage({ searchParams }: KakaoLinkPageProps) {
  const { accessToken } = await searchParams

  if (!accessToken) {
    redirect(PAGE_PATHS.AUTH_LOGIN)
  }

  return <KakaoLinkSection accessToken={accessToken} />
}
