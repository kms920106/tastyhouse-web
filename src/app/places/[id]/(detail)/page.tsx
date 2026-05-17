import { placeRepository } from '@/domains/place/place.repository'
import type { Metadata } from 'next'
import PlaceDetailPage from './_components/PlaceDetailPage'
import type { PlaceDetailTab } from './_components/PlaceDetailTabs'

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

const PLACE_TAB_VALUES: PlaceDetailTab[] = ['info', 'menu', 'photo', 'review']

function parsePlaceTab(value: string | undefined): PlaceDetailTab {
  return PLACE_TAB_VALUES.includes(value as PlaceDetailTab) ? (value as PlaceDetailTab) : 'info'
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, { tab }] = await Promise.all([params, searchParams])
  const placeId = Number(id)
  const initialTab = parsePlaceTab(tab)

  return <PlaceDetailPage placeId={placeId} initialTab={initialTab} />
}
