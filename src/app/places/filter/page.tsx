import PlaceFilterPage from './_components/PlaceFilterPage'

interface Props {
  searchParams: Promise<{
    stationId?: string
    foodTypes?: string
    amenities?: string
  }>
}

export default async function Page({ searchParams }: Props) {
  const {
    stationId: stationIdParam,
    foodTypes: foodTypesParam,
    amenities: amenitiesParam,
  } = await searchParams

  const stationId = stationIdParam ? Number(stationIdParam) : undefined
  const foodTypes = foodTypesParam?.split(',').filter(Boolean) ?? []
  const amenities = amenitiesParam?.split(',').filter(Boolean) ?? []

  return (
    <PlaceFilterPage
      stationId={stationId}
      foodTypes={foodTypes}
      amenities={amenities}
    />
  )
}
