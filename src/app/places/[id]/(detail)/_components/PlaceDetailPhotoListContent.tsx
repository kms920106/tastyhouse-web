import PlaceDetailPhotoList from './PlaceDetailPhotoList'

interface Props {
  placeId: number
}

export default function PlaceDetailPhotoListContent({ placeId }: Props) {
  return (
    <div className="px-[15px] pb-5">
      <PlaceDetailPhotoList placeId={placeId} />
    </div>
  )
}
