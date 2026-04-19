import { getIsLoggedIn } from '@/lib/auth-config'
import CommentInput from './CommentInput'

interface CommentInputServerProps {
  params: Promise<{ id: string }>
}

export default async function CommentInputServer({ params }: CommentInputServerProps) {
  const isLoggedIn = await getIsLoggedIn()

  const { id } = await params
  const reviewId = Number(id)

  return <CommentInput isLoggedIn={isLoggedIn} reviewId={reviewId} />
}
