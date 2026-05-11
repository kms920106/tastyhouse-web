import ReviewProductSection from './_components/ReviewProductSection'

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const reviewId = Number(id)

  return <ReviewProductSection reviewId={reviewId} />
}
