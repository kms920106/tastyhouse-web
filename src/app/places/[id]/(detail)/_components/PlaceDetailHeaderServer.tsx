import { HeaderTitle } from '@/components/layouts/Header'
import { placeRepository } from '@/domains/place/place.repository'

interface Props {
  placeId: number
}

export default async function PlaceDetailHeaderServer({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceDetail(placeId)

  if (error) {
    return <HeaderTitle>-</HeaderTitle>
  }

  if (!data) {
    return <HeaderTitle>-</HeaderTitle>
  }

  const { name } = data

  return <HeaderTitle>{name}</HeaderTitle>
}
