import { placeRepository } from '@/domains/place/place.repository'
import type { Metadata } from 'next'
import PlaceDetailPage from './_components/PlaceDetailPage'

interface Props {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    tab?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const placeId = Number(id)

  const [detailRes, bannersRes] = await Promise.all([
    placeRepository.getPlaceDetail(placeId),
    placeRepository.getPlaceBanners(placeId),
  ])

  const detail = detailRes.data
  const banners = bannersRes.data

  if (!detail) return {}

  const thumbnailUrl = banners?.[0]?.imageUrl
  const description = `${detail.name} | ${detail.roadAddress ?? detail.lotAddress ?? ''}`

  return {
    title: detail.name,
    description,
    openGraph: {
      title: detail.name,
      description,
      ...(thumbnailUrl && { images: [thumbnailUrl] }),
    },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params
  const { tab } = await searchParams
  const placeId = Number(id)
  const initialTab = (tab || 'info') as 'info' | 'menu' | 'photo'

  return <PlaceDetailPage placeId={placeId} initialTab={initialTab} />
}
