import PlaceDetailInfoFetcher from './PlaceDetailInfoFetcher'

interface Props {
  placeId: number
}

export default function PlaceDetailInfoContent({ placeId }: Props) {
  return (
    <div className="px-[15px] py-5">
      <PlaceDetailInfoFetcher placeId={placeId} />
    </div>
  )
}
