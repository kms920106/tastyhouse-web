import { AUTH_COOKIE_KEYS } from '@/lib/auth-config'
import { cookies } from 'next/headers'
import CommentInput from './CommentInput'

interface CommentInputServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentInputServer({ params }: CommentInputServerProps) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.ACCESS_TOKEN)

  const { id } = await params
  const reviewId = Number(id)

  return <CommentInput isLoggedIn={!!accessToken} reviewId={reviewId} />
}
